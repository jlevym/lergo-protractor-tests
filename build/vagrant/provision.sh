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

SYSTEM_TESTS_FOLDER=system-tests

killall lergo || echo "lergo is not running"
nohup node /home/vagrant/lergo-ri/package/server.js & > /dev/null 2>&1

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

echo "setting nginx configuration and translations"
# sudo ln -Tfs /vagrant/translations /home/vagrant/lergo-ui/package/translations
sudo ln -Tfs /vagrant/lergo.nginx /etc/nginx/sites-enabled/lergo.conf
sudo service nginx restart

npm install

export LERGO_ENDPOINT=http://localhost
export BROWSER_NAME="phantomjs"

grunt protract
