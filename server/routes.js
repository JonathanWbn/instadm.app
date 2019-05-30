const router = require('express').Router()
const multer = require('multer')

const { getInbox, sendMessage, getThread, getMoreThreadItems, getMoreInbox, sendPhoto } = require('./instagram.js')
const { logout, getUser, isLoggedIn } = require('./session.js')
const passport = require('./passport.js')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/login', passport.authenticate('local'))

router.post('/logout', isLoggedIn, logout)

router.get('/', isLoggedIn)

router.get('/inbox', isLoggedIn, getInbox)

router.get('/more-inbox', isLoggedIn, getMoreInbox)

router.get('/thread/:id', isLoggedIn, getThread)

router.get('/more-items/:id', isLoggedIn, getMoreThreadItems)

router.get('/user', isLoggedIn, getUser)

router.post('/send-message', isLoggedIn, sendMessage)

router.post('/send-photo/:thread_id', isLoggedIn, upload.single('file'), sendPhoto)

module.exports = router
