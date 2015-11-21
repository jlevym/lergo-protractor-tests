'use strict';

// script to destroy all system tests instances
var AWS = require('aws-sdk');
var _ = require('lodash');
AWS.config.region = process.env.VAGRANT_REGION;
AWS.config.update({accessKeyId: process.env.VAGRANT_AWS_KEY, secretAccessKey: process.env.VAGRANT_AWS_ACCESS_KEY });

var logger = require('log4js').getLogger('remove_all_instances');

var ec2 = new AWS.EC2();

function removeInstances() {
    ec2.describeInstances(function (err, data) {
        if (err) {
            logger.error(err);
        } else {
            //logger.info(JSON.stringify(data, {}, 4));

            var instances = [];
            _.each(data.Reservations, function (r) {
                _.each(r.Instances, function (i) {
                    var name = _.find(i.Tags, {'Key': 'Name'});
                    //logger.info(i.InstanceId + '[' + ( name ? name.Value : 'Unnamed' )  + ']::' + i.State.Name + '.' + i.State.Code);
                    //if (i.State.Code === 16 && name.Value === 'vagrant-system-tests'){
                    if (name && name.Value === 'vagrant-system-tests'){
                    instances.push(i.InstanceId);
                    //return i;
                    }
                });
            });

            if (instances.length > 0) {
                ec2.terminateInstances({InstanceIds: instances}, function (err, data) {
                    if (err) {
                        logger.error(err, err.stack);
                    } // an error occurred
                    if (data) {
                        logger.info(data);
                    }           // successful response
                });
            }


        }
    });

}

var sleepTime = parseInt(process.env.VAGRANT_TERMINATE_TIMEOUT || '1',10);
logger.info('sleepTime is', sleepTime );
setTimeout( removeInstances, sleepTime );
