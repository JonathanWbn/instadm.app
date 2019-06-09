const express = require('express')

const { isLoggedIn } = require('../utils/session')
const middlewares = require('../utils/middlewares')

const app = express()

app.use(...middlewares)
app.post('*', isLoggedIn, (req, res) => {
  req.logout()
  res.status(200).send({ success: true })
})

module.exports = app
