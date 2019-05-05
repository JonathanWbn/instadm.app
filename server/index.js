const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')

const cookieSession = require('cookie-session')
const config = require('../nuxt.config.js')

config.dev = !(process.env.NODE_ENV === 'production')

const app = express()

passport.use(
  new LocalStrategy((username, password, done) => {
    return done(null, { username, password })
  })
)

passport.serializeUser(function(user, done) {
  done(null, user.username)
})

passport.deserializeUser(function(username, done) {
  done(null, { username })
})

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

app.post('/login', passport.authenticate('local'))

app.get('/', (req, res, next) => {
  if (req.user) next()
  else res.status(301).redirect('/login')
})

app.use(nuxt.render)

app.listen(port, host)
consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true,
})
