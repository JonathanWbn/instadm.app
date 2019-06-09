const express = require('express')

const { isLoggedIn } = require('../utils/session')
const { getThread } = require('../utils/instagram')
const middlewares = require('../utils/middlewares')

const app = express()

app.use(...middlewares)
app.get('/api/thread/:id', isLoggedIn, getThread)

module.exports = app
