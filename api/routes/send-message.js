const express = require('express')

const { isLoggedIn } = require('../utils/session')
const { sendMessage } = require('../utils/instagram')
const middlewares = require('../utils/middlewares')

const app = express()

app.use(...middlewares)
app.post('*', isLoggedIn, sendMessage)

module.exports = app
