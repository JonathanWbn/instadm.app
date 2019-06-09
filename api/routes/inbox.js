const express = require('express')

const isLoggedIn = require('../logged-in')
const { getInbox } = require('../instagram')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.get('*', isLoggedIn, getInbox)

module.exports = app
