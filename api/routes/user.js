const express = require('express')

const { isLoggedIn } = require('../utils/session')
const middlewares = require('../utils/middlewares')

const app = express()

app.use(...middlewares)
app.get('*', isLoggedIn, (req, res) => {
  res.send(req.user)
})

module.exports = app
