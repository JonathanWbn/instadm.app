const express = require('express')

const isLoggedIn = require('../logged-in')
const { sendMessage } = require('../instagram')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.post('*', isLoggedIn, sendMessage)

module.exports = app
