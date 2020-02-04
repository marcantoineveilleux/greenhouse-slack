'use strict';

import { candidate_stage_change_response } from "greenhouse";

const departmentsFilter = process.env.DEPARTMENTS_FILTER
var _ = require('underscore')


var express = require('express');
var router = express.Router();
var slackConnector = require('../../models/slackConnector')
var harvestApi = require('../../models/harvestApi')
var _ = require('underscore')

router.post('/', function (req, res) {
  // Store JSON payload from Greenhouse
  var chain = Promise.resolve()
  var json : candidate_stage_change_response = req.body;
  console.log(JSON.stringify(json))

  switch(json.action) {
    case 'ping':
      chain.then(() => res.sendStatus(200));
      break;
    default:
        var application = json.payload.application;
        var candidate = application.candidate;
        var jobs = application.jobs;
      
        // Candidate info        
        var channelName;
        if(candidate && 
           candidate.first_name  && 
           candidate.last_name) {        
          channelName = `interview_${candidate.first_name}_${candidate.last_name}_${candidate.id.toString()}`;
          channelName = channelName.toLocaleLowerCase();
          channelName = channelName.replace(/\s/gi, '_')
        } else {
          console.log('Missing candidate informations.')
          chain.then(() => res.sendStatus(200));
          break;
        }

        var createChannel = false
        if(departmentsFilter != undefined) {
          const departments = _.map(departmentsFilter.split(','), department => department.toLowerCase())
          _.each(jobs, job => {
              _.each(job.departments, department => {
                if(department.name != undefined) {
                  if(_.contains(departments, department.name.toLowerCase())) {
                    createChannel = true;
                  }
                }                
              })            
          })
        }
                   
      
        if(application.current_stage != undefined && application.current_stage.interviews != undefined && application.current_stage.interviews.length > 0) {        
          const interview = application.current_stage.interviews[0]; 
          if(interview != undefined && interview.interviewers != undefined && interview.interviewers.length > 0) {
            var interviewers = interview.interviewers;
            var usersIds = _.map(interviewers, interviewer => interviewer.id)
            chain = harvestApi.getEmails(usersIds)
              .then(emails => slackConnector.ensureGroupExistsWithMembers(channelName, emails, createChannel))
          } else {
            console.log('Stage change doesnt contain any new interviewers.')
          }
        } else {
          console.log('Stage change doesnt contain any new interview.')
        }
      
         // Makes the Greenhouse webhook test ping gods pleased
         chain.then(() => res.sendStatus(200));
         break;

  }
});


module.exports = router;
