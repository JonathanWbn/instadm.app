const express = require('express')
const next = require('next')

const { followDanBilzerian, startSolvingChallenge, finishSolvingChallenge } = require('./instagram')
var bodyParser = require('body-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express().use(bodyParser.json())

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
      await followDanBilzerian(username, password)
    } catch (error) {
      if (error.json && error.json.error_type === 'checkpoint_challenge_required') {
        try {
          await startSolvingChallenge(error)
          res.json({ code: 'needs_code' })
        } catch (challengeError) {
          res.json({ code: 'challenge_failed' })
        }
      } else {
        res.json({ code: 'login_failed' })
      }
    }
  })

  server.post('/challenge', async (req, res) => {
    const { code, username, password } = req.body
    try {
      await finishSolvingChallenge(code)
      console.log('challenge solved')
      await followDanBilzerian(username, password)
    } catch (error) {
      console.log('challenge_failed', error)
      res.json({ code: 'challenge_failed' })
    }
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
