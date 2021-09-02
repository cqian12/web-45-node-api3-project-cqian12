const Users = require('./../users/users-model')

function logger(req, res, next) {
  const time = new Date().toLocaleString()

  console.log(`request method:${req.method}
  \n request url: ${req.originalURL}
  \n timestamp: ${time}`)
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params

  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({message:"user not found"})
    } else {
      req.user = user
      next()
    }
  }
  catch(err) {
    res.status(500).json({message:'problem finding user'})
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (!name || name.trim() === '') {
    res.status(400).json({message: "missing required name field"})
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const text = req.body.text
  if (!text || text.trim() === '' || typeof text !== 'string') {
    next({status: 400, message: "missing required text field"})
  } else {
    req.text = text.trim()
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