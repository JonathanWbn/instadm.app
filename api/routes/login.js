const express = require('express')

const passport = require('../passport')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.post('*', passport.authenticate('local'), (_req, res) => res.json({ success: true }))

module.exports = app
