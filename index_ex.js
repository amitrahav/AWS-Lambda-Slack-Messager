'use strict';

const SlackWebhook = require('slack-webhook')
 
let channel = process.env.CHANNEL || '#general'
let SlackWebhookUrl = process.env.SLACKWEBHOOKURL || 'https://hooks.slack.com/services/user/hook'
let deployUrl = process.env.URL || 'http://ec2-someIP.compute.amazonaws.com/';
let message = process.env.MESSAGE || 'Successfully deploy at ';


let slack = new SlackWebhook(SlackWebhookUrl);

slack.send({
  text: message + deployUrl,
  username: 'AWS finshed auto code deploy',
  icon_emoji: ':scream_cat:',
  channel: channel
})