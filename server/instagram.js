const { IgApiClient } = require('instagram-private-api')

const ig = new IgApiClient()

const login = async (username, password) => {
  ig.state.generateDevice(username)

  await ig.simulate.preLoginFlow()
  const loggedInUser = await ig.account.login(username, password)
  await ig.simulate.postLoginFlow()

  return loggedInUser
}

const getInbox = async pk => {
  const inboxFeed = ig.feed.directInbox()
  return await inboxFeed.items()
}

const sendMessage = async (pk, thread_id, message) => {
  const inboxFeed = ig.feed.directInbox()
  const threads = await inboxFeed.items()
  const thread = threads.find(thread => thread.thread_id === thread_id)
  await thread.broadcastText(message)
  // TODO: find correct API to send messages
  return 'sent'
}

module.exports = {
  login,
  getInbox,
  sendMessage,
}
