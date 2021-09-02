function logger(req, res, next) {
  console.log(`request method:${req.method}
  \n request url: ${req.url}
  \n timestamp: ${req.get(Date)}`)
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}