'use strict';

// Variables for Slack incoming webhook url
const slackToken = process.env.SLACK_USER_TOKEN
const slack = require('slack');
const _ = require('underscore')

function getChannelList(cursor = undefined) {
    var channels = {};
    return new Promise((resolve) => {
      slack.groups.list({
        token: slackToken,
        cursor: cursor
      }).then(response => {
        if(response.groups.length > 0) {
          response.groups.forEach(channel => {
            channels[channel.name] = channel;
          });
          if(!response.response_metadata && !response.response_metadata.next_cursor) {
            return getChannelList(response.response_metadata.next_cursor);
          }
        }      
      }).then(() => {
        resolve(channels);
      }).catch(e => {
        console.log(e)
      });
      
    })
  }

  function emailsToUserIds(emails) {
    var slackInterviewers = {};
    return Promise
    .all(_.map(emails, email => slack.users.lookupByEmail({token: slackToken, email: email})
        .then(response => {slackInterviewers[email] = response.user.id})))
    .then(() => {
      return Object.values(slackInterviewers);
    })
  }


  function ensureGroupExistsWithMembers(channelName, emails) {
    var channelId;
   
    return getChannelList().then(channels => {
      var chain = Promise.resolve()
      var channel = channels[channelName];
      if(!channels[channelName]) {
        chain.then(slack.groups.create(
          {token: slackToken,
          name: channelName})
          .then(response => {
            channel = response.group
            console.log('Channel created: ' + channel.name + ' (' + channel.id + ')')
          }))
      }

      return chain.then(() => {            
          return emailsToUserIds(emails).then(slackIds => {
            return Promise.all(_.map(slackIds, slackId => {
              return slack.groups.invite({token: slackToken, user: slackId, channel: channel.id})
            }))              
          })
        })        
        .catch(e => {
          console.log(e);
        })      
    });
  }
  

  module.exports = {
    ensureGroupExistsWithMembers: ensureGroupExistsWithMembers
};