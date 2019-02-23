const express = require('express')
const next = require('next')
var Client = require('instagram-private-api').V1
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
    const device = new Client.Device(username)
    const storage = new Client.CookieMemoryStorage()

    const followDanBilzerian = async () => {
      try {
        const session = await Client.Session.create(device, storage, username, password)
        const account = await Client.Account.searchForUser(session, 'danbilzerian')
        const relation = await Client.Relationship.create(session, account.id)
        console.log('successfully subscribed to dan bilzerian')
        return relation
      } catch (error) {
        if (error.json && error.json.error_type === 'checkpoint_challenge_required') {
          console.log('solving challenge')
          try {
            const challenge = await Client.Web.Challenge.resolve(error, 'phone')
            if (challenge.type !== 'phone') return
            await challenge.phone()
            await challenge.code('037825')
          } catch (challengeError) {
            console.log('challenge failed', challengeError.message)
          }
          console.log('challenge succeeded. logging in again')
          await followDanBilzerian()
        } else {
          // TODO: Login required to process this request
          console.log('error', error.message)
        }
      }
    }

    await followDanBilzerian()
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
