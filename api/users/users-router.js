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

router.get('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
  .catch(next)
});

router.post('/', logger, validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(newUser => res.status(201).json(newUser))
  .catch(next)
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(deletedUser => res.json(deletedUser))
  .catch(next)
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(post => res.json(post))
  .catch(next)
});

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert(req.body)
  .then(newPost => res.json(newPost))
  .catch(next)
});

router.use((err,req,res,next) => {
  console.log(err.message)
  res.status(err.status || 500).json({message: err.message})
})

// do not forget to export the router
module.exports = router