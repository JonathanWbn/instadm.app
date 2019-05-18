const { IgApiClient } = require('instagram-private-api')

const ig = new IgApiClient()

const login = async (username, password) => {
  ig.state.generateDevice(username)

  await ig.simulate.preLoginFlow()
  const loggedInUser = await ig.account.login(username, password)
  await ig.simulate.postLoginFlow()

  return loggedInUser
}

const getInbox = async () => {
  const inboxFeed = ig.feed.directInbox()
  return await inboxFeed.items()
}

const sendMessage = async (_pk, thread_id, message) => {
  const thread = ig.entity.directThread(thread_id)
  await thread.broadcastText(message)
  return 'sent'
}

const getThread = async (_pk, thread_id) => {
  const feed = ig.feed.directThread({ thread_id })
  const { thread } = await feed.request()
  return thread
}

module.exports = {
  login,
  getInbox,
  sendMessage,
  getThread,
}
