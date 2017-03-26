#set -vex
set -e


APT_GET_INSTALL=""
PROVISION_LOG_FILE="/dev/null"

 print(){
    echo -e "\e[95m$1\e[0m"
}

print "working.."



export LERGO_ME_CONF="/vagrant/config.json"
#if [ ! -f /vagrant/config.json ]; then
#    print "need to have a me.json file under synced_folder/dev/me.json"
#else
#    print "found me.json. thank!"
#    export LERGO_ME_CONF="/vagrant/dev/me.json"
#    echo "export LERGO_ME_CONF=/vagrant/dev/me.json" >> ~/.profile
#fi

print "apt-get update finished"
sudo apt-get -qq update -y # moved it here after 'apt-get install git failed..'


DEV_ENVIRONMENT="/vagrant/dev/environment.sh"
if [ -f ${DEV_ENVIRONMENT} ];then
    print "loading environment variables from dev/environment.sh"
    . ${DEV_ENVIRONMENT}
else
    print "$DEV_ENVIRONMENT is not there. skipping... "
fi

VAGRANT_ENVIRONMENT="/vagrant/environment.sh"
if [ -f ${VAGRANT_ENVIRONMENT} ];then
    print "loading environment variables from /vagrant/environment.sh"
    . ${VAGRANT_ENVIRONMENT}
else
    print "$VAGRANT_ENVIRONMENT is not there. skipping... "
fi


if [ -f /vagrant/build_id ]; then
    print "got build_id file"
    BUILD_NUMBER=`cat /vagrant/build_id`
    print "build_id value is $BUILD_NUMBER"
fi

echo "user is $USER"

if [ ! -f /usr/bin/node ];then
    print "installing nvm"
    # ( curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash )
    ( curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash || echo )


    print "activating nvm"
    . .nvm/nvm.sh &> /dev/null || source .nvm/nvm.sh &> /dev/null

    print "installing node"
    # todo: take the version from nvmrc
    echo "installing node 6.9.1" &&  nvm install 6.9.1  &> /dev/null && npm --version &> /dev/null

    NODE_VERSION=`node --version`
    print "node version is $NODE_VERSION"

    print "making node available with sudo"
    ## make node available from sudo
    n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
else
    print "node already installed"
fi


if [ "$BUILD_NUMBER" = "" ]; then
    print "getting latest successful build"
    BUILD_NUMBER=`node /vagrant/buildNumber/get_build_number.js`
    print "latest successful build is $BUILD_NUMBER"
fi

export PROMOTE_BUILD_NUMBER=$BUILD_NUMBER


BASE_URL="https://s3.amazonaws.com/lergo-backups/artifacts/build-lergo-$BUILD_NUMBER/jobs/build-lergo/$BUILD_NUMBER";
BUILD_ID_URL="$BASE_URL/build.id";
INSTALL_SCRIPT_URL="$BASE_URL/install.sh";
LERGO_RI_URL="$BASE_URL/lergo-ri-0.0.0.tgz";
LERGO_UI_URL="$BASE_URL/lergo-ui-0.0.0.tgz";


DEPLOY_BASE=`pwd`
LERGO_RI_FILE=$DEPLOY_BASE/lergo-ri.tgz
LERGO_UI_FILE=$DEPLOY_BASE/lergo-ui.tgz

if [ ! -f "$LERGO_RI_FILE" ];then
    ( ( wget -q  "$LERGO_RI_URL" -O $LERGO_RI_FILE &&
    mkdir $DEPLOY_BASE/lergo-ri &&
    tar -xzf $LERGO_RI_FILE -C $DEPLOY_BASE/lergo-ri &&
    cd lergo-ri/package ) > $PROVISION_LOG_FILE 2>&1 ) && print "lergo-ri downloaded.."  &
else
    print "lergo ri file already exists"
fi

if [ ! -f "$LERGO_UI_FILE" ];then
    ( ( wget -q "$LERGO_UI_URL" -O $LERGO_UI_FILE && mkdir $DEPLOY_BASE/lergo-ui && tar -xzf $LERGO_UI_FILE -C $DEPLOY_BASE/lergo-ui )  > $PROVISION_LOG_FILE 2>&1 ) && print "lergo-ui downloaded.."  &
else
    print "lergo ui file already exists"
fi


if [ ! -f /usr/bin/git ]; then
    print "installing git"
    sudo apt-get  -qq install git -y # we cannot run this in the background.. need this now
    print "git installed"
else
    print "git already installed"
fi


SYSTEM_TESTS_FOLDER=`pwd`/system-tests
# rm -rf $SYSTEM_TESTS_FOLDER || print "folder does not exist"

if [ ! -e "$SYSTEM_TESTS_FOLDER" ];then
    git clone  "https://github.com/lergo/lergo-protractor-tests.git" $SYSTEM_TESTS_FOLDER
    cd $SYSTEM_TESTS_FOLDER

else
    print "$SYSTEM_TESTS_FOLDER already exists. updating it"
    cd $SYSTEM_TESTS_FOLDER
    git pull

fi

print "installing chrome" && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'


sudo apt-get -qq update -y # another update

print "running apt-get install on $APT_GET_INSTALL"
sudo apt-get -qq install --fix-missing  -y g++ libgconf2-4 libnss3-1d libxss1 mongodb openjdk-8-jre-headless nginx google-chrome-stable xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic
print "apt get install finished"

MONGODB_VERSION=`mongod --version`
print "mongodb version is $MONGODB_VERSION"

print "running npm installs"
sudo npm -s install -g grunt-cli phantomjs
print "grunt-cli installed"
sudo npm -s cache clean
print "npm cache is clean"
npm -s install
print "npm install finished"

print "waiting for installation to finish"
wait
print "everything finished.. starting tests"
print "sleeping for 10 seconds" && sleep 10 # wait for mongo to start. random value.
print "inserting mongo data"
mongo lergo-test < /vagrant/test_data.js
print "data inserted to mongo successfully"

killall lergo || print "lergo is not running"
nohup node /home/$USER/lergo-ri/package/server.js &> $PROVISION_LOG_FILE &


print "starting headless display" && ( ( Xvfb :99 ) & ) && export DISPLAY=:99

print "setting nginx configuration and translations"
# sudo ln -Tfs /vagrant/translations /home/vagrant/lergo-ui/package/translations
# sudo ln -Tfs /vagrant/lergo.nginx /etc/nginx/sites-enabled/lergo.conf
sudo \cp -f  /vagrant/lergo.nginx /etc/nginx/sites-enabled/lergo.conf
sudo sed -i s/__USER__/${USER}/g /etc/nginx/sites-enabled/lergo.conf
sudo service nginx restart

sudo apt-get install unzip -y
wget -O localdriver.zip https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip &> /dev/null
unzip localdriver.zip &> /dev/null
export BROWSERSTACK_LOCAL="`pwd`/BrowserStackLocal"

# get public ip for instance
export PUBLIC_IP=`curl http://169.254.169.254/latest/meta-data/public-ipv4`

pushd ~
    echo "export LERGO_ENDPOINT=http://localhost:1616" >>  vars
    echo "export BROWSER_NAME=\"chrome\"" >>  vars
    echo "export SYSTEM_TEST_FOLDER=\"$SYSTEM_TESTS_FOLDER\"" >>  vars
    echo "export PROMOTE_BUILD_NUMBER=\"$PROMOTE_BUILD_NUMBER\"" >>  vars
    echo "export LERGO_PROT_TEST_CONF=\"/vagrant/testconf.json\"">>  vars
    echo "export DISPLAY=:99" >>  vars
    echo "export BROWSERSTACK_LOCAL=\"${BROWSERSTACK_LOCAL}\"" >>  vars
    echo "export PUBLIC_IP=\"${PUBLIC_IP}\"" >> vars
    echo "source vars" >>  .bashrc
    source vars || . vars
popd

./node_modules/protractor/bin/webdriver-manager update
echo "webdriver-manager update done successfully"

print "TEST_CONF file is [$LERGO_PROT_TEST_CONF]"

terminate(){
    nohup node remove_all_instances &> /dev/null &
}

mkdir -p test/results
grunt test
