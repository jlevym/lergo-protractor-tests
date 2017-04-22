Prerequisite
```
Node: 6.9.1

Java JDK 8
```


# How to set up the project


```
npm install -g grunt-cli phantomjs
npm install
./node_modules/protractor/bin/webdriver-manager update

```

# How to run the tests

## Setup For Running On Localhost

 - run lergo on your machine
 - create a dir test/results
 - setup mongo data `grunt resetMongoData`
 - set the mongo URL in your configuration to point to `test-lergo-data`
 - declare on the endpoint `export PROTRACTOR_ENDPOINT="http://localhost:9000"`
 - run `grunt protract:XXX` - where XXX is the suite you want to run. (read more about it below) 
 - or, run 'grunt test' - this cycles through all the tests
 - if port 4444 is not released at the end of the testing,  run
 - - 'netstat -nlp | grep 4444' - to get the PID
 - - 'kill <pid>' - to free up the port 4444
# Available Suites

 - See list of all suites at [protractor conf file](https://github.com/lergo/lergo-protractor-tests/blob/master/protractor.sanity.conf.js)
 - `custom` - is a special suite that allows you to focus on a specific file. just declare `export LERGO_SPEC=path/to/file` and only that file will be executed. 

NOTE: you can also use [ddesrcibe and iit - OR - fdescribe and fit - DEPENDS ON JASMINE VERSION](http://stackoverflow.com/a/23793631/1068746) to focus on specific test

## Sanity tests

```
grunt protractor
```

## Applitools tests

```
grunt applitools
```

## Running without grunt

following protractor's instructions


1.  Start the Selenium server:  `./node_modules/.bin/webdriver-manager start`

1.  Open a new terminal and run Protractor:  `./node_modules/.bin/protractor protractor.conf.js`
