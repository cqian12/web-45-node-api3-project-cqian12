const Users = require('./../users/users-model')

function logger(req, res, next) {
  const time = new Date().toLocaleString()

  console.log(`request method:${req.method}
  \n request url: ${req.originalURL}
  \n timestamp: ${time}`)
  next()
}

function validateUserId(req, res, next) {
  const { id } = req.params

  Users.getById(id)
  .then(user => {
    if (user) {
      req.user = user
      next()
    } else {
      next({status:404, message:"user not found"})
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
  const name = req.body.name
  if (!name || name.trim() === '' || typeof name !== 'string') {
    next({status: 400, message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const text = req.body.text
  if (!text || text.trim() === '' || typeof text !== 'string') {
    next({status: 400, message: "missing required text field"})
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}