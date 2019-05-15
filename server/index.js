const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const passport = require('./passport.js')
const config = require('../nuxt.config.js')
const { getInbox, sendMessage } = require('./instagram.js')

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
        .catch(() => res.status(400).end('no feed'))
    } else {
      res.status(400).end('no user')
    }
  })
  .post('/send-message', (req, res) => {
    if (req.user) {
      sendMessage(req.user.pk, req.body.thread_id, req.body.message)
        .then(() => res.send('sent'))
        .catch(err => console.log('err', err) || res.status(400).end('TODO: error message'))
    } else {
      res.status(400).end('no user')
    }
  })
  .use(nuxt.render)
  .listen(port, host)

consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true,
})
