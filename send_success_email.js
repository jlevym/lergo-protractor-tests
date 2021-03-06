'use strict';

var mandrill = require('mandrill-api/mandrill');
var _ = require('lodash');
var logger = require('log4js').getLogger('send_success_email');
var mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

var emails = _.map(process.env.MANDRILL_TO_EMAILS.split(';'), function(e){
    return { 'email' : e, type: 'to'};
});

logger.info('sending to ' + JSON.stringify(emails) );

var message = {
    "html": "Lergo build " +  process.env.PROMOTE_BUILD_NUMBER + " was promoted<br/><a href=\"http://" + process.env.PUBLIC_IP + ":1616\">See the instance here</a>",
    "subject": "Lergo Promoted a Build",
    "from_email": "lergo.builds@yopmail.com",
    "from_name": "Lergo Build System",
    "to": emails

};
var async = true;
mandrillClient.messages.send({"message": message, "async": async});
