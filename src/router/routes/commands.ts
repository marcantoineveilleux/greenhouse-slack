'use strict';

var slackConnector = require('../../models/slackConnector')
var _ = require('underscore')
var moment = require('moment')
const ARCHIVE_AFTER_NB_DAYS = process.env.ARCHIVE_AFTER_NB_DAYS ? process.env.ARCHIVE_AFTER_NB_DAYS : 30;


var express = require('express');
var router = express.Router();

router.post('/cleanup', function (req, res) {
    slackConnector.getChannelList().then((channels) => {

        // More then a month old
        var channelsToArchive = _.filter(channels, channel => { return moment.duration(moment(moment.now()).diff(moment(channel.created * 1000, 'x'))).asDays() > ARCHIVE_AFTER_NB_DAYS})
        channelsToArchive = _.filter(channelsToArchive, channel => channel.name.startsWith('iv_'))
        channelsToArchive = _.filter(channelsToArchive, channel => (channel.is_archived == undefined || !channel.is_archived))
        
        return slackConnector.archiveChannels(_.map(channelsToArchive, channel => channel.id))
        
    }).then(() => res.sendStatus(200))
})

module.exports = router;