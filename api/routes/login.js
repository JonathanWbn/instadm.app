const express = require('express')

const passport = require('../passport')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.post('*', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) res.status(err.response.statusCode).send(err.text)
    else if (!user) res.status(400).send('No user found.')
    else {
      req.logIn(user, err => {
        if (err) res.status(400).send('Something went wrong in the login process.')
        else res.json({ success: true, username: user.username })
      })
    }
  })(req, res, next)
})

module.exports = app
