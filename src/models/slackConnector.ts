'use strict';

// Variables for Slack incoming webhook url
const slackToken = process.env.SLACK_USER_TOKEN
const slack = require('slack');
var _ = require('underscore')

function getChannelList(cursor = undefined) {
    var channels = {};
    return new Promise((resolve) => {
      slack.conversations.list({
        token: slackToken,
        cursor: cursor,
        exclude_archived: true,
        types: "private_channel"
      }).then(response => {
        console.log(response)
        if(response.channels.length > 0) {
          response.channels.forEach(channel => {
            channels[channel.name] = channel;
          });
          if(response.response_metadata != undefined && response.response_metadata.next_cursor) {
            return getChannelList(response.response_metadata.next_cursor).then((nextPageChannels) => { _.each(nextPageChannels, channel => channels[channel.name] = channel ) } );
          }
        }      
      }).then(() => {
        resolve(channels);
      }).catch(e => {
        console.log(e)
      });      
    })
  }

  function archiveChannels(channelIds) {
    if(!channelIds && channelIds.length < 1) {
      return
    }

    const delayIncrement = 500;
    let delay = 0;

    return Promise.all(_.map(channelIds, channelId => {
      return slack.conversations.archive({token: slackToken, channel: channelId})
    }))
  }

  function emailsToUserIds(emails) {
    var slackInterviewers = {};
    return Promise
    .all(_.map(emails, email => slack.users.lookupByEmail({token: slackToken, email: email})
        .then(response => {slackInterviewers[response.user.id] = email})
        .catch(e => console.log(`Could not find user "${email}" in slack.`))))        
    .then(() => {
      return slackInterviewers;
    })
  }


  function ensureGroupExistsWithMembers(channelName, emails) {
    return getChannelList().then(channels => {
      var chain = Promise.resolve()
      var channel = channels[channelName];
      if(!channel) {
        chain = chain.then(() => slack.conversations.create(
          {token: slackToken,
          name: channelName,
          is_private: true})
          .then(response => {
            channel = response.conversation
            console.log('Channel created: ' + channel.name + ' (' + channel.id + ')')
          }))
          .catch(e => console.log(e))
      }

      return chain.then(() => {            
          return emailsToUserIds(emails).then(slackIdToEmails => {
            var slackIds = Object.keys(slackIdToEmails)
            var usersString = slackIds.join(',');
            console.log('Inviting ' + usersString + ' to ' + channel.name)
            return slack.conversations.invite({token: slackToken, user: usersString, channel: channel.id}).catch(e =>  console.log('Could not invite ' + Object.entries(slackIdToEmails).join(',') + ' (' + usersString + ') to ' + channel.name + '. ' + e))
          })
        })        
        .catch(e => {
          console.log(e);
        })      
    });
  }
  

  module.exports = {
    ensureGroupExistsWithMembers: ensureGroupExistsWithMembers,
    getChannelList: getChannelList,
    archiveChannels: archiveChannels
};