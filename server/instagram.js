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

module.exports = {
  login,
  getInbox,
  sendMessage,
}
