const { IgApiClient } = require('instagram-private-api')

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
  const ig = new IgApiClient()
  await ig.state.deserializeCookieJar(req.user.cookies)

  const feed = ig.feed.directInbox()

  if (req.query.cursor) {
    feed.state = {
      inbox: {
        oldest_cursor: req.query.cursor,
      },
    }
  }

  const inbox = await feed.items()

  res.send({
    inbox,
    moreAvailable: feed.moreAvailable,
    cursor: feed.cursor,
  })
}

const sendMessage = async (req, res) => {
  try {
    const ig = new IgApiClient()
    await ig.state.deserializeCookieJar(req.user.cookies)

    const thread = ig.entity.directThread(req.body.thread_id)
    await thread.broadcastText(req.body.message)
    res.send({ success: true })
  } catch (e) {
    res.status(400).send(e)
  }
}

const sendPhoto = async (req, res) => {
  try {
    const ig = new IgApiClient()
    await ig.state.deserializeCookieJar(req.user.cookies)

    const thread = ig.entity.directThread(req.params.thread_id)
    await thread.broadcastPhoto({ file: req.file.buffer })
    res.send({ success: true })
  } catch (e) {
    res.status(400).send(e)
  }
}

const getThread = async (req, res) => {
  try {
    const ig = new IgApiClient()
    await ig.state.deserializeCookieJar(req.user.cookies)

    const thread_id = req.params.id

    let thread
    let feed

    if (req.query.cursor) {
      feed = ig.feed.directThread({ thread_id, oldest_cursor: req.query.cursor })
      const request = await feed.request()
      thread = request.thread
    } else {
      feed = ig.feed.directThread({ thread_id })
      const request = await feed.request()
      thread = request.thread
      if (feed.moreAvailable) {
        const { thread: newThread } = await feed.request()
        thread = {
          ...newThread,
          items: [...thread.items, ...newThread.items],
        }
      }
    }

    res.send({
      thread,
      moreAvailable: feed.moreAvailable,
      cursor: feed.cursor,
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports = {
  login,
  getInbox,
  sendMessage,
  getThread,
  sendPhoto,
}
