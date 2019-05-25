const router = require('express').Router()

const { getInbox, sendMessage, getThread, getMoreThreadItems, getMoreInbox, sendPhoto } = require('./instagram.js')
const passport = require('./passport.js')

function isLoggedIn(req, res, next) {
  if (req.user) next()
  else res.status(301).redirect('/login')
}

router.post('/login', passport.authenticate('local'))

router.get('/', isLoggedIn)

router.get('/inbox', isLoggedIn, getInbox)

router.get('/more-inbox', isLoggedIn, getMoreInbox)

router.get('/thread/:id', isLoggedIn, getThread)

router.get('/more-items/:id', isLoggedIn, getMoreThreadItems)

router.get('/user', isLoggedIn, (req, res) => {
  res.send(req.user)
})

router.post('/send-message', isLoggedIn, sendMessage)

router.post('/send-photo', isLoggedIn, sendPhoto)

module.exports = router
