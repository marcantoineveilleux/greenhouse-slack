'use strict';

var express = require('express');
var router = express.Router();
var slackConnector = require('../../models/slackConnector')
var harvestApi = require('../../models/harvestApi')
var _ = require('underscore')

router.post('/', function (req, res) {
  // Makes the Greenhouse webhook test ping gods pleased
  res.sendStatus(200);

  // Store JSON payload from Greenhouse
    var json = req.body;
  console.log(JSON.stringify(json))

  var application = json.payload.application;
  var candidate = application.candidate;
  var jobs = application.jobs;

  // Candidate info
  var candidateId = candidate.id;
  var candidateName = candidate.first_name + " " + candidate.last_name;
  var idAsString = candidate.id.toString()
  var channelName = "iv_" + candidate.first_name.substring(0, 3) + '_' + candidate.last_name.substring(0, 13) + idAsString[idAsString.length-1];
  channelName = channelName.toLocaleLowerCase();
  
  // Application and interview info
  var jobName = jobs[0].name;
  var jobId = jobs[0].id;
  var departmentName = jobs[0].departments[0].name;
  var applicationId = application.id;
  var applicationStatus = application.status;
  var interviewStage = application.current_stage.name;
  var interview = application.current_stage.interviews[0];
  var interviewStatus = interview.status;
  var interviewers = interview.interviewers;

  // String mutation for formatting message to Slack
  var icon = '';
  var message = '';
  var color = '';
  var applicationGreenhouseLink = '<https://app.greenhouse.io/people/' + candidateId + '?application_id=' + applicationId + '|View in Greenhouse>';


  console.log(message);


  // Check if job is a
  var isRD = departmentName == 'Community';

  var usersIds = _.map(interviewers, interviewer => interviewer.id)
  var emails = harvestApi.getEmails(usersIds)
 
  slackConnector.ensureGroupExistsWithMembers(channelName, emails)
  
});


module.exports = router;
