'use strict';
var _ = require('lodash');
var path = require('path');


_.merge(exports, require( process.env.LERGO_PROT_TEST_CONF || path.resolve(path.join(__dirname,'..','..','build/vagrant/synced_folder','testconf.json'))));
