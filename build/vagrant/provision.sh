set -v
set -e
set -x

if [ -f /vagrant/build_id ]; then
    echo "got build_id file"
    BUILD_NUMBER=`cat /vagrant/build_id`
    echo "build_id value is $BUILD_NUMBER"
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

LERGO_RI_FILE=`pwd`/lergo-ri.tgz
LERGO_UI_FILE=`pwd`/lergo-ui.tgz
if [ ! -f "$LERGO_RI_FILE" ];then
    wget "$LERGO_RI_URL" -O $LERGO_RI_FILE
    tar -xzf $LERGO_RI_FILE -C lergo-ri
else
    echo "lergo ri file already exists"
fi

if [ ! -f "$LERGO_UI_FILE" ];then
    wget "$LERGO_UI_URL" -O $LERGO_UI_FILE
    tar -xzf $LERGO_UI_FILE -C lergo-ui
else
    echo "lergo ui file already exists"
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

if [ ! -f /usr/bin/git ]; then
    echo "installing git"
    sudo apt-get install -y git
else
    echo "git already installed"
fi

if [ ! -f /usr/bin/java ]; then
    echo "installing java"
    sudo apt-get install -y openjdk-7-jre-headless
else
    echo "java already installed"
fi

if [ ! -f /usr/bin/mongo ]; then
    echo "installing mongodb"
    sudo apt-get install -u mongodb
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

# rm -rf $SYSTEM_TESTS_FOLDER || echo "folder does not exist"

if [ ! -e "$SYSTEM_TESTS_FOLDER" ];then
    git clone  "https://github.com/lergo/lergo-protractor-tests.git" $SYSTEM_TESTS_FOLDER
else
    echo "$SYSTEM_TESTS_FOLDER already exists. updating it"
    cd $SYSTEM_TESTS_FOLDER
    git pull
    npm install
    cd ..
fi

cd $SYSTEM_TESTS_FOLDER
sudo npm cache clean
npm install

export LERGO_ENDPOINT=http://localhost
export BROWSER_NAME="phantomjs"

grunt protract
