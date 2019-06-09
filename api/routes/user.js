const express = require('express')

const isLoggedIn = require('../logged-in')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.get('*', isLoggedIn, (req, res) => res.send(req.user))

module.exports = app
