set -v
set -e
set -x



if [ ! -f /vagrant/dev/me.json ]; then
    echo "need to have a me.json file under synced_folder/dev/me.json"
else
    echo "found me.json. thank!"
    export LERGO_ME_CONF="/vagrant/dev/me.json"
    echo "export LERGO_ME_CONF=/vagrant/dev/me.json" >> ~/.profile
fi

if [ -f /vagrant/build_id ]; then
    echo "got build_id file"
    BUILD_NUMBER=`cat /vagrant/build_id`
    echo "build_id value is $BUILD_NUMBER"
fi


if [ ! -f /usr/bin/node ];then
    echo "installing node"
    NODEJS_VERSION=0.10.35
    NODEJS_HOME=/opt/nodejs
    sudo mkdir -p $NODEJS_HOME
    sudo chown vagrant:vagrant $NODEJS_HOME
    curl --fail --silent http://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz -o /tmp/nodejs.tar.gz
    tar -xzf /tmp/nodejs.tar.gz -C ${NODEJS_HOME} --strip-components=1
    sudo ln -s /opt/nodejs/bin/node /usr/bin/node
    sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm
else
    echo "node already installed"
fi


if [ "$BUILD_NUMBER" = "" ]; then
    echo "getting latest successful build"
    BUILD_NUMBER=`node /vagrant/buildNumber/get_build_number.js`
    echo "latest successful build is $BUILD_NUMBER"
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
    wget "$LERGO_RI_URL" -O $LERGO_RI_FILE
    mkdir $DEPLOY_BASE/lergo-ri
    tar -xzf $LERGO_RI_FILE -C $DEPLOY_BASE/lergo-ri
    cd lergo-ri/package
else
    echo "lergo ri file already exists"
fi

if [ ! -f "$LERGO_UI_FILE" ];then
    wget "$LERGO_UI_URL" -O $LERGO_UI_FILE
    mkdir $DEPLOY_BASE/lergo-ui
    tar -xzf $LERGO_UI_FILE -C $DEPLOY_BASE/lergo-ui
else
    echo "lergo ui file already exists"
fi


if [ ! -f /usr/bin/git ]; then
    echo "installing git"
    sudo apt-get install -y git
else
    echo "git already installed"
fi

if [ ! -f /usr/bin/java ]; then
    echo "installing java for selenium"
    sudo apt-get update
    sudo apt-get install -y openjdk-7-jre-headless --fix-missing
else
    echo "java already installed"
fi

if [ ! -f /usr/bin/mongo ]; then
    echo "installing mongodb"
    sudo apt-get install -y mongodb
else
    echo "mongo is already installed"
fi

sleep 10 # wait for mongo to start. random value.
echo "inserting mongo data"
mongo lergo-test < /vagrant/test_data.js
echo "data inserted to mongo successfully"

if [ ! -f /usr/bin/grunt ]; then
    echo "installing grunt and phantom"
    sudo npm install -g grunt-cli phantomjs

else
    echo "grunt and phantom already installed"
fi

if [ ! -f /usr/sbin/nginx ];then
    echo "installing nginx"
    sudo apt-get install nginx -y
else
    echo "nginx already installed"
fi

SYSTEM_TESTS_FOLDER=`pwd`/system-tests

killall lergo || echo "lergo is not running"
nohup node /home/vagrant/lergo-ri/package/server.js &> /dev/null &

# rm -rf $SYSTEM_TESTS_FOLDER || echo "folder does not exist"

sudo npm cache clean

if [ ! -e "$SYSTEM_TESTS_FOLDER" ];then
    git clone  "https://github.com/lergo/lergo-protractor-tests.git" $SYSTEM_TESTS_FOLDER
    cd $SYSTEM_TESTS_FOLDER

else
    echo "$SYSTEM_TESTS_FOLDER already exists. updating it"
    cd $SYSTEM_TESTS_FOLDER
    git pull

fi

if [ !  -f /usr/bin/google-chrome ];then
    echo "installing chrome"
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
    sudo apt-get update -y
    sudo apt-get install google-chrome-stable -y
else
    echo "chrome already installed"
fi

sudo apt-get install xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic -y

echo "starting headless display"
Xvfb :99 &
export DISPLAY=:99


echo "setting nginx configuration and translations"
# sudo ln -Tfs /vagrant/translations /home/vagrant/lergo-ui/package/translations
sudo ln -Tfs /vagrant/lergo.nginx /etc/nginx/sites-enabled/lergo.conf
sudo service nginx restart

npm install

echo "export LERGO_ENDPOINT=http://localhost:1616" >>  /home/vagrant/vars
echo "export BROWSER_NAME=\"chrome\"" >>  /home/vagrant/vars
echo "export SYSTEM_TEST_FOLDER=\"$SYSTEM_TESTS_FOLDER\"" >>  /home/vagrant/vars
echo "export LERGO_PROT_TEST_CONF=\"/vagrant/testconf.json\"">>  /home/vagrant/vars
echo "export DISPLAY=:99" >>  /home/vagrant/vars
echo "source vars" >>  /home/vagrant/.bashrc

source  /home/vagrant/vars
echo "TEST_CONF file is [$LERGO_PROT_TEST_CONF]"

grunt protract
