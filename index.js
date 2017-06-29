'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const SlackWebhook = require('slack-webhook')
 
		let deployUrl = process.env.URL || 'http://ec2-52-208-99-48.eu-west-1.compute.amazonaws.com/';
		let chanel = process.env.CHANEL || '#harshama'
		let SlackWebhookUrl = process.env.SLACKWEBHOOKURL || 'https://hooks.slack.com/services/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'

		let slack = new SlackWebhook(SlackWebhookUrl);


		slack.send({
		  text: 'secssesful deploy at ' + deployUrl,
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
