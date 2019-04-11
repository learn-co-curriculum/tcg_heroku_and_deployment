# Heroku and Deployment

## Learning Goals

- Deploy an app to heroku
- Use tools to monitor and manage your deployed application

## Overview

Read the following sections and follow the instructions to deploy the blogger app to heroku.

- What is Deployment?
- Deploying the blogger app to heroku
- Quality Assurance
- Visibility
- Firefighting
- Benchmarking and Performance
- Heroku tips and tricks
- Common Questions

If you get stuck, you can take a look at the [Heroku Docs on Deployment](https://devcenter.heroku.com/articles/getting-started-with-rails5) or follow along with a [Deployment Lecture Video](https://youtu.be/h02-iyUkCjI)

## Deployment

### Goals

Our normal development process involves running frontend and backend code on our laptop. We want to deploy our application so that it is 'alive' for real users.

- run our app on other computers
- run the 'production' version of our app
- point a URL to our app

Deployment is the process of setting up an application to serve our application on another computer, usually available at some URL.

### Running this app locally

```sh
cd blogger/blogger-backend
bundle install
rake db:reset
rails s
cd ../blogger-frontend
yarn install
yarn start
```

### System Diagramming

What are the parts of our system now?

- developer machine
  - code and editor
  - rails server
  - database (sqlite or postgres)
  - webpack server for serving react app
  - browser
- github

What are the parts of the system that we're adding?

- app servers (possibly multiple!)
- Continuous Integration (CI) servers
- users

Draw a diagram of the system, with boxes for these parts of the system. As we go, add arrows and labels for the different actions we can take to move things between the parts of the system

## Deployments: What's different between local and prod?

- Environment variables e.g. `ENV['SECRET_KEY_BASE']`
- secrets
- which database we access
- asset storage (CDN vs local)
- where blobs get saved (local machine vs. S3)
- where logs and debug info get logged
- running on different hardware (different OS)
  - different versions of dependencies might be installed
- differences within your application
  - throttling usage / performance differences
  - 'feature flags' turn on and off features

### Deploying Blogger

Strategy:

- make changes to frontend and backend code to work on heroku
- deploy backend to heroku
- deploy frontend to heroku

#### Deploying Blogger: Backend

The system won't run the same on heroku and your laptop. Make the necessary changes to the app code and deploy to heroku.

- use postgres instead of sqlite
- init git, create heroku app, deploy
- create, migrate, seed db on heroku

#### Deploying Blogger: Frontend

You'll also need to make some changes to the frontend code so that it's ready to work when deployed to heroku. For the most part, this entails pointing the BASE_URL to the right location in the right environment.

- process.env.REACT_APP_BASE_URL
- init git, create heroku app, deploy

> Note: if env vars are not prefixed with REACT*APP*, they won't be passed through

## Quality Assurance

We need to make sure that users don't experience bugs

Strategies:

- Automated testing (rspec, jest)
  - run these locally
  - run before the app is deployed
- Manual QA
  - as feature developer, click all your buttons
  - often, use a 'staging' environment for manual testing
  - 'feature flags' let you turn on a feature for a subset of users

### QA for your projects

Employers will look at your projects. You need to make sure that what they see makes sense and works. Bugs in deployed projects can cost you an offer!

How can you prevent that?

- Test your app!
  - use bad inputs
  - don't follow the 'happy path'
- Get others to test your app!
- Features that don't make sense to a user are not features
  - they're bugs!

What else can you do?

- Link to the Github!
  - Important to write a _great_ README.md
  - Nice to include a .gif of the app in action
- Describe the project without deploying it

## Visibility and Error Reporting

How do developers see errors in production apps?

- User reports
- Manual testing
- Manually reading / parsing log files
- Use some error reporting tool
  - Set up Rollbar or Sentry
  - Go look at the dashboard

How do developers find out when something is wrong?

- User reports
- Manual testing
- Set up an alerting system
- new 500 error, more than 100 in a minute
- _pages_ the engineer _on call_
- PagerDuty

## Debugging in Prod: Firefighting

How do I debug errors in my production app?

1. Remain Calm
2. Where in the system is the error happening?
3. Get visibility into the system

- visibility is how we debug!
- getting a stack trace of the error is often 90% of solving the issue

4. Form and test hypothesis about the error

- I think the error happens whenever X happens
- Check
- Yes! It happens!
- Check that it _doesn't_ happen in other circumstances
- You've found the bug!

5. Fix the bug

- Add a failing test case 'proving' the bug
- Change the code
- Test case turns green
- Deploy the fix

Often, if a bug is introduced right when new code is deployed, instead of trying to fix the bug and deploy the fix, you should 'roll back' to a known working version.

- Usually faster
- Usually safer

### Data issues

- remove the bad data
- make code changes
  - prevent bad data from getting in
  - be resilient to (handle) bad data in the application

## CI Deploy pipeline

**What is a CI pipeline?**

- System to automatically do a sequence of steps when there is new code to deploy
- Triggered by e.g. push to github `master` branch
- Steps:
  - run tests
    - fails -> let the developer know
    - passes -> continue to deploy
  - turn on new app servers
  - run migrations
  - switch handling of requests to new servers
  - turn off old servers

## Benchmarking and Performance

How do we know when our app is slow? How do we find the slow parts of the application?

- where in the system is our slowness?
  - 'APM' - Application Performance Monitoring
  - tell me which routes are slow
  - tell me what about them is slow (app code, database, something else)

How do we fix slowness?

- Locate the issue!
- Benchmarking - run code lots of times, see how fast different versions are
- Deploy faster code
- Watch the graph on the monitoring tool

## Heroku Tips and Tricks

```
heroku help
heroku run rails c
heroku run bash
heroku logs
heroku logs -t -n 50
heroku releases
heroku rollback [version]
```

## Common Questions

**What are 'worker's?**

- another 'box' (machine) that is responsible for some app task
- like sending out daily emails, updating something in the database, etc.

**What is puma?**

- App scaling: vertical, horizontal
- manages threads on a single machine
- run more 'threads' on a machine
- So that one computer can handle more requests
- This is 'vertical' scaling - bigger computer

**Secrets management**

- Often through env variables
- Heroku has a UI panel to put things
- Don't expose your secrets!

**How do we run migrations in production?**

- sometimes manual, a la `heroku run bash`
- often part of the CI pipeline
- some migrations are 'safe', e.g. add a column - won't break your code
- multi-part deploys for 'unsafe' migrations, e.g. dropping a column
  - 1. remove all references to the old column in code
  - 2. drop the column
  - 'unsafe' includes a _lot_ of schema changes
- modifying production database without losing the data
  - backups
  - production data debugging

**How do we handle storage for user-uploaded files?**

- S3 Simple Storage Service
- Microsoft, Google
- different from static asset storage
  - CDN

**what does a devops role look like?**

- In charge of things like the deployment process
- thinking about the actual machines the apps are running on
- debugging network and system issues

**how do admin roles work?**

- two kinds of 'admin'
- users on the machines that run the apps
  - handled by the OS, part of the deploy process
  - often no login, only able to access via ssh keys
- 'users' within the application
  - some column indicates 'role'
  - conditional logic to determine access / capabilities of different roles

**What is nginx? (vs. puma vs. other options)**

- usually used as a load balancer
- handles different routes by directing requests to different applications
