# Slack Messager for Aws lambda
this is a lambda function for sending slack message at any chanel.

##usage
* upload zipfile.zip into aws new function.
* use env veribals to set details:
	* MESSAGE = slack message
	* URL = the link to attach at the end of the message.
	* CHANEL = #slack chanel
	* SLACKWEBHOOKURL = slack webhook url as provided [https://YOURGROUP.slack.com/apps/manage/custom-integrations](https://api.slack.com/incoming-webhooks)
* the notification displayed next to screaming cat icon.
* don't forget to attach aws role the lambda:ListFunctions premmision.

##develop
* run `nvm use` in case you using nvm. - **this is important because only specific node versions are allowed at lambda.**
* you can test function localy on index_ex.js
* index.js is wrapped with lambda handler.
* rebuild zip by `source zip.sh`