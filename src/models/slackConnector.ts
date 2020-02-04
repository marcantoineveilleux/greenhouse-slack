'use strict';

// Variables for Slack incoming webhook url
const slackToken = process.env.SLACK_BOT_TOKEN
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


  function ensureGroupExistsWithMembers(channelName, emails, createChannel: boolean) {
    return getChannelList().then(channels => {
      var chain = Promise.resolve()
      var channel
      if(channels != undefined) {
        channel = channels[channelName];
      }
      
      if(!channel && createChannel) {
        chain = chain.then(() => slack.conversations.create(
          {token: slackToken,
          name: channelName,
          is_private: true})
          .then(response => {
            channel = response.channel
            console.log('Channel created: ' + channel.name + ' (' + channel.id + ')')
          }))
          .catch(e => console.log(e))
      }

      // if the channel doesn't exist and we should not create a channel
      if(!channel && !createChannel) {
        return chain.then(() => {            
          return emailsToUserIds(emails).then(slackIdToEmails => {
            var slackIds = Object.keys(slackIdToEmails)
            var usersString = slackIds.join(',');
            var usersDescription = _.map(slackIds, slackId => {
              return slackIdToEmails[slackId] + ' (' + slackId + ')'
            }).join(',')
            
            console.log('Inviting ' + usersDescription + ' to ' + channel.name)
            return slack.conversations.invite({token: slackToken, users: usersString, channel: channel.id}).catch(e =>  console.log('Could not invite everyone in ' + usersDescription + ' to ' + channel.name + ' (' + channel.id + '). ' + e))
          })
        })        
        .catch(e => {
          console.log(e);
        })  
      } else {
        console.log(`'${channelName}' doesn't exist and should not be created.`);
      }
          
    });
  }
  

  module.exports = {
    ensureGroupExistsWithMembers: ensureGroupExistsWithMembers,
    getChannelList: getChannelList,
    archiveChannels: archiveChannels
};