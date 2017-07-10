'use strict';

const SlackWebhook = require('slack-webhook')
const AWS = require('aws-sdk');


exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
 
	// ----- SOME CODEPIPELINE EVENT OBJECTS ---- //
    let codepipeline = new AWS.CodePipeline();
    // Retrieve the Job ID from the Lambda action
    const CPjobId = event["CodePipeline.job"].id;
    
    // Retrieve the value of UserParameters from the Lambda action configuration in AWS CodePipeline, in this case a URL which will be
    // health checked by this function.
    const CPuserParameters = event["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters; 

    
	// ----- GENRAL VARS ---- //
	let channel = CPuserParameters.channel || process.env.CHANNEL || '#general'
	let SlackWebhookUrl = CPuserParameters.slackwebhook || process.env.SLACKWEBHOOKURL || 'https://hooks.slack.com/services/user/hook'
	let deployUrl = CPuserParameters.url || process.env.URL || 'http://ec2-someIP.compute.amazonaws.com/';
	let message = CPuserParameters.message || process.env.MESSAGE || 'Successfully deploy at ';


    var putJobSuccess = function(message) {
        var params = {
            jobId: CPjobId
        };
        codepipeline.putJobSuccessResult(params, function(err, data) {
            if(err) {
                context.fail(err);      
            } else {
                context.succeed('all went fine');      
            }
        });
    };

    var putJobFailure = function(message) {
        var params = {
            jobId: CPjobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.invokeid
            }
        };
        codepipeline.putJobFailureResult(params, function(err, data) {
            context.fail(message);      
        });
    };

	let slack = new SlackWebhook(SlackWebhookUrl);
	slack.send({
	  text: message + deployUrl,
	  username: 'AWS finshed auto code deploy',
	  icon_emoji: ':scream_cat:',
	  channel: channel
	}).then(function (res) {
	  // succesful request 
	  // Notify AWS CodePipeline of a successful job
	   putJobSuccess('all went fine');  // Echo back the first key value
	}).catch(function (err) {
	  // handle request error 
	   putJobFailure(err);  // Echo back the first key value
	});

};
