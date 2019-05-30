const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { login } = require('./instagram.js')

const store = {}

passport.use(
  new LocalStrategy((username, password, done) => {
    login(username, password)
      .then(loggedInUser => done(null, loggedInUser))
      .catch(error => done(error))
  })
)

passport.serializeUser((user, done) => {
  store[user.pk] = user
  done(null, user.pk)
})

passport.deserializeUser((pk, done) => {
  done(null, store[pk] || null)
})

module.exports = passport
