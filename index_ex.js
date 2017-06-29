'use strict';

const SlackWebhook = require('slack-webhook')
 
let chanel = process.env.CHANEL || '#general'
let SlackWebhookUrl = process.env.SLACKWEBHOOKURL || 'https://hooks.slack.com/services/user/hook'
let deployUrl = process.env.URL || 'http://ec2-someIP.compute.amazonaws.com/';
let massage = process.env.Massage || 'Successfully deploy at ';

let slack = new SlackWebhook(SlackWebhookUrl)


slack.send({
  text: massage + deployUrl,
  username: 'AWS finshed auto code deploy',
  icon_emoji: ':scream_cat:',
  channel: chanel
})