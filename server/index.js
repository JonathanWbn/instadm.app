const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const passport = require('./passport.js')
const config = require('../nuxt.config.js')
const { getInbox, sendMessage, getThread } = require('./instagram.js')

config.dev = process.env.NODE_ENV !== 'production'

const app = express()
const nuxt = new Nuxt(config)

const { host, port } = nuxt.options.server

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
} else {
  nuxt.ready()
}

app
  .use(cookieSession({ secret: 'some-secret' }))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(passport.session())
  .post('/login', passport.authenticate('local'))
  .get('/', (req, res, next) => {
    if (req.user) next()
    else res.status(301).redirect('/login')
  })
  .get('/inbox', (req, res) => {
    if (req.user) {
      getInbox(req.user.pk)
        .then(inbox => res.send(inbox))
        .catch(err => res.status(400).send(err))
    } else {
      res.status(404).end('user not found')
    }
  })
  .get('/thread/:id', (req, res) => {
    if (req.user) {
      getThread(req.user.pk, req.params.id)
        .then(thread => res.send(thread))
        .catch(err => res.status(400).send(err))
    } else {
      res.status(404).end('user not found')
    }
  })
  .get('/user', (req, res) => {
    if (req.user) {
      res.send(req.user)
    } else {
      res.status(404).end('user not found')
    }
  })
  .post('/send-message', (req, res) => {
    if (req.user) {
      sendMessage(req.user.pk, req.body.thread_id, req.body.message)
        .then(() => res.send('sent'))
        .catch(err => res.status(400).send(err))
    } else {
      res.status(404).end('user not found')
    }
  })
  .use(nuxt.render)
  .listen(port, host)

consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true,
})
