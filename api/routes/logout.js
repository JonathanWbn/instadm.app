const express = require('express')

const isLoggedIn = require('../logged-in')
const middlewares = require('../middlewares')

const app = express()

app.use(...middlewares)
app.post('*', isLoggedIn, (req, res) => {
  req.logout()
  res.status(200).send({ success: true })
})

module.exports = app
