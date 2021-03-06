const express = require('express');
const server = express();
// global middlewares and the user's router need to be connected here
const cors = require('cors')
const morgan = require('morgan')
const users = require('./users/users-router')
const { logger,validatePost,validateUser,validateUserId } = require('./middleware/middleware')

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use('/api/users',users)

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

module.exports = server;
