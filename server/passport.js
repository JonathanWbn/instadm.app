const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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

module.exports = passport
