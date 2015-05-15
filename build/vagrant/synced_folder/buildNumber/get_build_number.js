var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init('https://guymograbi.ci.cloudbees.com/');
jenkins.last_success('build-lergo', function(err, data) {
    if (!!err){
        return console.log(err);
    }
    var buildNumber = data.number;



    console.log(buildNumber);

});