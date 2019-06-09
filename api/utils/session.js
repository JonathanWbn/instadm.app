const isLoggedIn = (req, res, next) => {
  if (req.user) next()
  else res.status(404).send({ success: false })
}

module.exports = {
  isLoggedIn,
}
