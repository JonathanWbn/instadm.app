var Client = require('instagram-private-api').V1

let device
let storage
const followDanBilzerian = async (username, password) => {
  device = device || new Client.Device(username)
  storage = storage || new Client.CookieMemoryStorage()
  console.log('logging in')
  const session = await Client.Session.create(device, storage, username, password)
  console.log('setting proxy')
  Client.Request.setProxy('http://45.124.67.187:8080/')
  console.log('searching for user')
  const account = await Client.Account.searchForUser(session, 'danbilzerian')
  console.log('following account')
  const relation = await Client.Relationship.create(session, account.id)
  console.log('successfully subscribed to dan bilzerian')
  return relation
}

let challenge

const startSolvingChallenge = async error => {
  challenge = await Client.Web.Challenge.resolve(error, 'phone')
  if (challenge.type !== 'phone') return
  await challenge.phone()
}

const finishSolvingChallenge = async code => {
  await challenge.code(code)
}

module.exports = {
  followDanBilzerian,
  startSolvingChallenge,
  finishSolvingChallenge,
}
