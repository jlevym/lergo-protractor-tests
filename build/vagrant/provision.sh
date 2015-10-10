#set -vex
set -e


APT_GET_INSTALL=""
PROVISION_LOG_FILE="/dev/null"

 print(){
    echo -e "\e[95m$1\e[0m"
}

print "working.."

if [ ! -f /vagrant/dev/me.json ]; then
    print "need to have a me.json file under synced_folder/dev/me.json"
else
    print "found me.json. thank!"
    export LERGO_ME_CONF="/vagrant/dev/me.json"
    echo "export LERGO_ME_CONF=/vagrant/dev/me.json" >> ~/.profile
fi

if [ -f /vagrant/build_id ]; then
    print "got build_id file"
    BUILD_NUMBER=`cat /vagrant/build_id`
    print "build_id value is $BUILD_NUMBER"
fi


if [ ! -f /usr/bin/node ];then
    print "installing node"
    NODEJS_VERSION=0.10.35
    NODEJS_HOME=/opt/nodejs
    sudo mkdir -p $NODEJS_HOME
    sudo chown vagrant:vagrant $NODEJS_HOME
    curl --fail --silent http://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz -o /tmp/nodejs.tar.gz
    tar -xzf /tmp/nodejs.tar.gz -C ${NODEJS_HOME} --strip-components=1
    sudo ln -s /opt/nodejs/bin/node /usr/bin/node
    sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm
else
    print "node already installed"
fi


if [ "$BUILD_NUMBER" = "" ]; then
    print "getting latest successful build"
    BUILD_NUMBER=`node /vagrant/buildNumber/get_build_number.js`
    print "latest successful build is $BUILD_NUMBER"
fi


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


print "running apt-get install on $APT_GET_INSTALL"
( sudo apt-get -qq update && print "apt-get update finished" &&  sudo apt-get -qq install --fix-missing  -y g++ libgconf2-4 libnss3-1d libxss1 mongodb openjdk-7-jre-headless nginx google-chrome-stable xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic && print "apt get install finished" ) &
print "running npm installs"
( sudo npm -s install -g grunt-cli phantomjs  && print "grunt-cli installed" && sudo npm -s cache clean && print "npm cache is clean" && npm -s install && print "npm install finished" ) &

print "waiting for installation to finish"
wait
print "everything finished.. starting tests"
print "sleeping for 10 seconds" && sleep 10 # wait for mongo to start. random value.
print "inserting mongo data"
mongo lergo-test < /vagrant/test_data.js
print "data inserted to mongo successfully"

killall lergo || print "lergo is not running"
nohup node /home/vagrant/lergo-ri/package/server.js &> $PROVISION_LOG_FILE &


print "starting headless display" && ( ( Xvfb :99 ) & ) && export DISPLAY=:99

print "setting nginx configuration and translations"
# sudo ln -Tfs /vagrant/translations /home/vagrant/lergo-ui/package/translations
sudo ln -Tfs /vagrant/lergo.nginx /etc/nginx/sites-enabled/lergo.conf
sudo service nginx restart



echo "export LERGO_ENDPOINT=http://localhost:1616" >>  /home/vagrant/vars
echo "export BROWSER_NAME=\"chrome\"" >>  /home/vagrant/vars
echo "export SYSTEM_TEST_FOLDER=\"$SYSTEM_TESTS_FOLDER\"" >>  /home/vagrant/vars
echo "export LERGO_PROT_TEST_CONF=\"/vagrant/testconf.json\"">>  /home/vagrant/vars
echo "export DISPLAY=:99" >>  /home/vagrant/vars
echo "source vars" >>  /home/vagrant/.bashrc

source  /home/vagrant/vars
print "TEST_CONF file is [$LERGO_PROT_TEST_CONF]"

grunt protract
