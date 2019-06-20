'use strict';
import { application_updated_response } from "greenhouse";

 

var express = require('express');
var router = express.Router();
var slackConnector = require('../../models/slackConnector')
var harvestApi = require('../../models/harvestApi')
var _ = require('underscore')

router.post('/', function (req, res) {
  // Store JSON payload from Greenhouse
  var chain = Promise.resolve()
  var json : application_updated_response = req.body;
  console.log(JSON.stringify(json))

  var application = json.payload.application;
  var candidate = application.candidate;
  var jobs = application.jobs;

  // Candidate info
  var candidateId = candidate.id;
  var candidateName = candidate.first_name + " " + candidate.last_name;
  var idAsString = candidate.id.toString()
  var channelName = `iv_${candidate.first_name.substring(0, 3)}_${candidate.last_name.substring(0, 12)}_${idAsString[idAsString.length-1]}`;
  channelName = channelName.toLocaleLowerCase();
  
  // Application and interview info
  if(jobs[0] !== undefined) {
    var jobName = jobs[0].name;
    var jobId = jobs[0].id;
    if(jobs[0].departments[0] != undefined) {
      var departmentName = jobs[0].departments[0].name;
    }    
  }

  var applicationId = application.id;
  var applicationStatus = application.status;
  var interviewStage = application.current_stage.name;
  var applicationGreenhouseLink = '<https://app.greenhouse.io/people/' + candidateId + '?application_id=' + applicationId + '|View in Greenhouse>';


  const interview = application.current_stage.interviews[0]; 
  if(interview != undefined && interview.interviewers != undefined && interview.interviewers.length > 0) {
    var interviewers = interview.interviewers;
    var usersIds = _.map(interviewers, interviewer => interviewer.id)
    chain = harvestApi.getEmails(usersIds)
      .then(emails => slackConnector.ensureGroupExistsWithMembers(channelName, emails))
  } else {
    console.log('Stage change doesnt contain any new interviewers.')
  }

   // Makes the Greenhouse webhook test ping gods pleased
   chain.then(() => res.sendStatus(200));  
});


module.exports = router;
