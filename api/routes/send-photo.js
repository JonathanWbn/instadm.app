const express = require('express')
const multer = require('multer')

const isLoggedIn = require('../logged-in')
const { sendPhoto } = require('../instagram')
const middlewares = require('../middlewares')

const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.use(...middlewares)
app.post('/api/send-photo/:thread_id', isLoggedIn, upload.single('file'), sendPhoto)

module.exports = app
