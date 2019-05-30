const logout = (req, res) => {
  req.logout()
  res.status(200).send({ success: true })
}

const getUser = (req, res) => {
  res.send(req.user)
}

const isLoggedIn = (req, res, next) => {
  if (req.user) next()
  else res.redirect('/login')
}

module.exports = {
  logout,
  getUser,
  isLoggedIn,
}
