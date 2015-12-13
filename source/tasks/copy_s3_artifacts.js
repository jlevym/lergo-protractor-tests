'use strict';
var AWS = require('aws-sdk');
var _ = require('lodash');
var path = require('path');
var awsDetails = require(process.env.AWS_JSON || path.resolve(__dirname, '/vagrant/dev/aws.json'));

var logger = require('log4js').getLogger('copy_s3_artifacts');
var s3 = new AWS.S3({ accessKeyId: awsDetails.accessKey, secretAccessKey : awsDetails.secretAccessKey });

var promoteBuild = process.env.PROMOTE_BUILD_NUMBER;

var PROMOTE_TYPES={ STAGING : 'staging', PRODUCTION : 'production'};

var promoteType = process.env.PROMOTE_TYPE || 'staging'; //staging / production

if ( !promoteBuild ){
    logger.error('PROMOTE_BUILD_NUMBER is missing');
    process.exit(1);
}

logger.info('PROMOTE_BUILD_NUMBER is ' + promoteBuild);
logger.info('PROMOTE_TYPE is', promoteType);
var files = ['build.id','install.sh','lergo-ri-0.0.0.tgz','lergo-ui-0.0.0.tgz'];


if ( promoteType === PROMOTE_TYPES.STAGING ) {

    _.each(files, function (f) {
        s3.copyObject({
            Bucket: awsDetails.bucket,
            CopySource: 'lergo-backups/artifacts/build-lergo-' + promoteBuild + '/jobs/build-lergo/' + promoteBuild + '/' + f,
            Key: 'artifacts/latest/' + f,
            ACL: 'public-read'

        }, function (err, data) {
            if (err) {
                logger.error(err);
            }
            if (data) {
                logger.info(data);
            }

        });

    });
}

if ( promoteType === PROMOTE_TYPES.PRODUCTION ){
    _.each(files, function (f) {
        s3.copyObject({
            Bucket: awsDetails.bucket,
            CopySource: 'lergo-backups/artifacts/build-lergo-' + promoteBuild + '/jobs/build-lergo/' + promoteBuild + '/' + f,
            Key: 'lergo-backups/builds/production/' + promoteBuild + '/' + f,
            ACL: 'public-read'

        }, function (err, data) {
            if (err) {
                logger.error(err);
            }
            if (data) {
                logger.info(data);
            }

        });

        s3.copyObject({
            Bucket: awsDetails.bucket,
            CopySource: 'lergo-backups/artifacts/build-lergo-' + promoteBuild + '/jobs/build-lergo/' + promoteBuild + '/' + f,
            Key: 'lergo-backups/builds/production/latest/' +  f,
            ACL: 'public-read'

        }, function (err, data) {
            if (err) {
                logger.error(err);
            }
            if (data) {
                logger.info(data);
            }

        });


    });
}


