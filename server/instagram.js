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

module.exports = {
  login,
  getInbox,
}
