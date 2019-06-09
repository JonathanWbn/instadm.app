const express = require('express')

const isLoggedIn = require('../logged-in')
const { getThread } = require('../instagram')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.get('/api/thread/:id', isLoggedIn, getThread)

module.exports = app
