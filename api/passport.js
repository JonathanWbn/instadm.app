const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { login } = require('./instagram')

passport.use(
  new LocalStrategy((username, password, done) => {
    login(username, password)
      .then(({ user, cookies }) => done(null, { username: user.username, pk: user.pk, cookies }))
      .catch(error => done(error))
  })
)

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user))
})

passport.deserializeUser((user, done) => {
  done(null, user && JSON.parse(user))
})

module.exports = passport
