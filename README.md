# greenhouse-slack integration
>Pipes events from candidate tracking app [Greenhouse](greenhouse.io) into [Slack](slack.com) channels

## What it does

1. Takes webhook events in Greenhouse
2. Create a Slack message and invite people.


## Slack tokens:
Uses:
1. slack.conversations.list
2. slack.conversations.archive
3. slack.users.lookupByEmail
4. slack.conversations.create
5. slack.conversations.invite

Token Scope Needs:
1. groups:read
2. groups:write
3. users:read.email 