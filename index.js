// require your server and launch it
const server = require('./api/server')

server.listen(3333, () => {
    console.log('listening on http://localhost:3333')
})