# greenhouse-slack integration
>Pipes events from candidate tracking app [Greenhouse](greenhouse.io) into [Slack](slack.com) channels

## What it does

1. Takes webhook events in Greenhouse
2. Create a Slack message and invite people.

## Environment variables
- GREENHOUSE_TOKEN: The greenhouse token to use for calls
- SLACK_BOT_TOKEN: The bot token to use for the slack calls

## Docker
> docker build -t server .
> docker run --env GREENHOUSE_TOKEN --env SLACK_BOT_TOKEN  -p 5000:5000 server

## Slack tokens scope:
Uses:
1. slack.conversations.list
2. slack.conversations.archive
3. slack.users.lookupByEmail
4. slack.conversations.create
5. slack.conversations.invite

Token Scope Needs:
1. groups:read
2. groups:write
3. users:read
4. users:read.email 