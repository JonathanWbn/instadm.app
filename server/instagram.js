const { IgApiClient } = require('instagram-private-api')

const igSessions = {}
const threads = {}
const inboxes = {}

const login = async (username, password) => {
  const igSession = new IgApiClient()
  igSession.state.generateDevice(username)

  await igSession.simulate.preLoginFlow()
  const loggedInUser = await igSession.account.login(username, password)
  await igSession.simulate.postLoginFlow()

  igSessions[loggedInUser.pk] = igSession

  return loggedInUser
}

const getInbox = async (req, res) => {
  try {
    const igSession = igSessions[req.user.pk]
    inboxes[req.user.pk] = igSession.feed.directInbox()
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
    const igSession = igSessions[req.user.pk]
    const thread = igSession.entity.directThread(req.body.thread_id)
    await thread.broadcastText(req.body.message)
    res.send({ success: true })
  } catch (e) {
    res.status(400).send(e)
  }
}

const sendPhoto = async (req, res) => {
  try {
    const igSession = igSessions[req.user.pk]
    const thread = igSession.entity.directThread(req.params.thread_id)
    await thread.broadcastPhoto({ file: req.file.buffer })
    res.send({ success: true })
  } catch (e) {
    res.status(400).send(e)
  }
}

const getThread = async (req, res) => {
  try {
    const igSession = igSessions[req.user.pk]
    const thread_id = req.params.id
    threads[thread_id] = igSession.feed.directThread({ thread_id })
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
