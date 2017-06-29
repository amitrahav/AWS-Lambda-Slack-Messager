const SlackWebhook = require('slack-webhook')
 
let deployUrl = process.env.URL || 'http://ec2-52-208-99-48.eu-west-1.compute.amazonaws.com/';
let chanel = process.env.CHANEL || '#harshama'
let SlackWebhookUrl = process.env.SLACKWEBHOOKURL || 'https://hooks.slack.com/services/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'

let slack = new SlackWebhook(SlackWebhookUrl)


slack.send({
  text: 'secssesful deploy at ' + deployUrl,
  username: 'AWS finshed auto code deploy',
  icon_emoji: ':scream_cat:',
  channel: chanel
})