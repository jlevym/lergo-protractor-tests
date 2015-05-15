
# How to set up the project


```
npm install
```

# How to run the tests


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
