const express = require('express');
const Users = require('./../users/users-model')
const Posts = require('./../posts/posts-model')
const { logger,validateUser,validatePost,validateUserId } = require('./../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  Users.get()
  .then(users => res.status(200).json(users))
  .catch(next)
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
  //.catch(next)
});

router.post('/', logger, validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(() => {
    return Users.getById(req.params.id)
  })
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
});

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await Users.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(post => res.json(post))
  .catch(next)
});

router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const newPost = await Posts.insert({user_id:req.params.id, text: req.text})
    res.status(201).json(newPost)
  } catch(err) {
    next(err)
  }
});

router.use((err,req,res,next) => {
  console.log(err.message)
  res.status(err.status || 500).json({message: err.message})
})

// do not forget to export the router
module.exports = router