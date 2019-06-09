const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const passport = require('./passport')

module.exports = [
  cookieSession({ secret: 'some-secret' }),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  passport.initialize(),
  passport.session(),
]
