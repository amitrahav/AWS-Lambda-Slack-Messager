'use strict';

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const SlackWebhook = require('slack-webhook')
 
		let chanel = process.env.CHANEL || '#general'
		let SlackWebhookUrl = process.env.SLACKWEBHOOKURL || 'https://hooks.slack.com/services/user/hook'
		let deployUrl = process.env.URL || 'http://ec2-someIP.compute.amazonaws.com/';
		let message = process.env.MESSAGE || 'Successfully deploy at ';


		let slack = new SlackWebhook(SlackWebhookUrl);


		slack.send({
		  text: message + deployUrl,
		  username: 'AWS finshed auto code deploy',
		  icon_emoji: ':scream_cat:',
		  channel: chanel
		}).then(function (res) {
		  // succesful request 
    	callback(null, 'all went fine');  // Echo back the first key value
		}).catch(function (err) {
		  // handle request error 
    	callback('Something went wrong', err);  // Echo back the first key value
		});

};
