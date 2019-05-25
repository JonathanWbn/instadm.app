const { IgApiClient } = require('instagram-private-api')

const ig = new IgApiClient()
const threads = {}
const inboxes = {}

const login = async (username, password) => {
  ig.state.generateDevice(username)

  await ig.simulate.preLoginFlow()
  const loggedInUser = await ig.account.login(username, password)
  await ig.simulate.postLoginFlow()

  return loggedInUser
}

const getInbox = async (req, res) => {
  try {
    inboxes[req.user.pk] = ig.feed.directInbox()
    const inbox = await inboxes[req.user.pk].items()
    res.send({
      inbox,
      moreAvailable: inboxes[req.user.pk].moreAvailable,
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

const getMoreInbox = async (req, res) => {
  try {
    const inbox = await inboxes[req.user.pk].items()
    res.send({
      inbox,
      moreAvailable: inboxes[req.user.pk].moreAvailable,
    })
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

const sendPhoto = async (req, res) => {
  try {
    const thread = ig.entity.directThread(req.body.thread_id)
    await thread.broadcastPhoto({ file: req.body.image })
    res.send('sent')
  } catch (e) {
    res.status(400).send(e)
  }
}

const getThread = async (req, res) => {
  try {
    const thread_id = req.params.id
    threads[thread_id] = ig.feed.directThread({ thread_id: thread_id })
    const { thread } = await threads[thread_id].request()
    const moreItems = await threads[thread_id].items()
    res.send({
      thread: {
        ...thread,
        items: [...thread.items, ...moreItems],
      },
      moreAvailable: threads[thread_id].moreAvailable,
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

const getMoreThreadItems = async (req, res) => {
  try {
    const thread_id = req.params.id
    const items = await threads[thread_id].items()
    res.send({
      items,
      moreAvailable: threads[thread_id].moreAvailable,
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports = {
  login,
  getInbox,
  getMoreInbox,
  sendMessage,
  getThread,
  getMoreThreadItems,
  sendPhoto,
}
