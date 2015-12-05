'use strict';

// script to destroy all system tests instances
var AWS = require('aws-sdk');
var _ = require('lodash');
AWS.config.region = process.env.VAGRANT_REGION;
AWS.config.update({accessKeyId: process.env.VAGRANT_AWS_KEY, secretAccessKey: process.env.VAGRANT_AWS_ACCESS_KEY });
var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init('https://guymograbi.ci.cloudbees.com/');

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

function removeInstancesIfNotRunning(){
    jenkins.last_build_info('lergo-system-tests', function(err, data){
        if ( data && data.building ){
            logger.info('build is running.. waiting for build to finish');
            setTimeout( removeInstancesIfNotRunning, 60*1000 ); // wait a minute and try again
        }else{
            logger.info('build is finished. removing machines');
            removeInstances();
        }
    });
}

var sleepTime = parseInt(process.env.VAGRANT_TERMINATE_TIMEOUT || '1',10);
logger.info('sleepTime is', sleepTime );
setTimeout( removeInstancesIfNotRunning, sleepTime );
