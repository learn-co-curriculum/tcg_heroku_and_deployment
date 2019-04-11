# README

This is the frontend for the blogger application.

It's a sample frontend that you can deploy to heroku for demonstration.

Steps to deploy to Heroku (assumes that you have the heroku CLI configured):

```
git init
git add .
git commit -m "initial commit"
heroku create blogger-frontend
git push heroku master
heroku config:set REACT_APP_BASE_URL="http://blogger-backend.herokuapp.com"
```