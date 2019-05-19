const { IgApiClient } = require('instagram-private-api')

const ig = new IgApiClient()

const login = async (username, password) => {
  ig.state.generateDevice(username)

  await ig.simulate.preLoginFlow()
  const loggedInUser = await ig.account.login(username, password)
  await ig.simulate.postLoginFlow()

  return loggedInUser
}

const getInbox = async (_req, res) => {
  try {
    const inboxFeed = ig.feed.directInbox()
    const inbox = await inboxFeed.items()
    res.send(inbox)
  } catch (e) {
    res.status(400).send(e)
  }
}

const sendMessage = async (req, res) => {
  try {
    const thread = ig.entity.directThread(req.body.thread_id)
    await thread.broadcastText(req.body.message)
    res.send('sent')
  } catch (e) {
    res.status(400).send(e)
  }
}

const getThread = async (req, res) => {
  try {
    const feed = ig.feed.directThread({ thread_id: req.params.id })
    const { thread } = await feed.request()
    res.send(thread)
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports = {
  login,
  getInbox,
  sendMessage,
  getThread,
}
