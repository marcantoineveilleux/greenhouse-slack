
'use strict';
const superagent = require('superagent');
const _ = require('underscore')
const harvestToken = process.env.GREENHOUSE_TOKEN

function getEmails(usersIds) {
    var emails = {}
    return Promise.all(_.map(usersIds, userId => {
        return superagent
            .get('https://harvest.greenhouse.io/v1/users/' + userId)
            .set('Authorization', 'Basic ' + harvestToken)
            .set('accept', 'json')
            .then(response => {
                emails[userId] = response.body.emails[0]
            })

    })).then(() => {
        return emails
    });       
}

module.exports = {
    getEmails: getEmails
};