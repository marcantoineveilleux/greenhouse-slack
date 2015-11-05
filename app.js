'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Variables for Slack incoming webhook url
var GREENHOUSE_EVENT_SLACK_WEBHOOK_URL = process.env.GREENHOUSE_EVENT_SLACK_WEBHOOK_URL;
var slack = require('slack-notify')(GREENHOUSE_EVENT_SLACK_WEBHOOK_URL);

// Middleware
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json

// Endpoints
app.get('/', function (req, res) {
  res.send('Hullo Werld!');
});

app.post('/greenhouse-event', function (req, res) {
  var content = req.body;
  var name = content.payload.application.candidate.first_name + " " + content.payload.application.candidate.last_name;
  var job = content.payload.application.jobs[0].name;
  console.log(job);
  var message = name + " applied to " + job;
  res.json(message);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
