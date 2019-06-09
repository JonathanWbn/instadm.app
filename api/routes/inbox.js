const express = require('express')

const { isLoggedIn } = require('../utils/session')
const { getInbox } = require('../utils/instagram')
const middlewares = require('../utils/middlewares')

const app = express()

app.use(...middlewares)
app.get('*', isLoggedIn, getInbox)

module.exports = app
