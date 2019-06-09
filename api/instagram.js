const { IgApiClient } = require('instagram-private-api')

const initializeClient = async req => {
  const ig = new IgApiClient()
  await ig.state.deserializeCookieJar(req.user.cookies)
  return ig
}

const login = async (username, password) => {
  const ig = new IgApiClient()

  ig.state.generateDevice(username)

  const user = await ig.account.login(username, password)
  const cookies = await ig.state.serializeCookieJar()

  return {
    user,
    cookies,
  }
}

const getInbox = async (req, res) => {
  const ig = await initializeClient(req)
  const feed = ig.feed.directInbox()

  if (req.query.cursor) feed.cursor = req.query.cursor

  const inbox = await feed.items()

  res.send({
    inbox,
    moreAvailable: feed.moreAvailable,
    cursor: feed.cursor,
  })
}

const sendMessage = async (req, res) => {
  const ig = await initializeClient(req)
  const thread = ig.entity.directThread(req.body.thread_id)

  await thread.broadcastText(req.body.message)

  res.send({ success: true })
}

const sendPhoto = async (req, res) => {
  const ig = await initializeClient(req)
  const thread = ig.entity.directThread(req.params.thread_id)

  await thread.broadcastPhoto({ file: req.file.buffer })

  res.send({ success: true })
}

const getThread = async (req, res) => {
  const ig = await initializeClient(req)
  const { id: thread_id } = req.params
  const { cursor } = req.query

  const feed = ig.feed.directThread({ thread_id, oldest_cursor: cursor })
  const request = await feed.request()

  let thread = request.thread

  // fetch twice when first load
  if (!cursor && feed.moreAvailable) {
    const { thread: newThread } = await feed.request()
    thread = {
      ...newThread,
      items: [...thread.items, ...newThread.items],
    }
  }

  res.send({
    thread,
    moreAvailable: feed.moreAvailable,
    cursor: feed.cursor,
  })
}

module.exports = {
  login,
  getInbox,
  sendMessage,
  getThread,
  sendPhoto,
}
