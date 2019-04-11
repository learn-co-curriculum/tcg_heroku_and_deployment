# README

This is the backend for the blogger application.

It's a sample app that you can deploy to heroku for practice.

Steps to deploy to Heroku (assumes you have set up the heroku cli):

```
git init
git add .
git commit -m "initial commit"
heroku create blogger-backend
git push heroku master
heroku run rake db:migrate
heroku run rake db:seed
```