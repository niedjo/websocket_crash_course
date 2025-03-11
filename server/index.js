const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer();
const io = new Server(httpServer, {
    cors : {
        origin : ["http://localhost:5173", "http://127.0.0.1:5173"]
    }
});

const playerScore = []
io.on('connection', (socket) => {
    // console.log(socket)
    socket.emit('message', 'hello')
    socket.on('message', (data) => {
        console.log(data)
    })
    socket.on('scores', (scores) => {
        console.log(scores)
        playerScore.push({...scores, id : socket.id})
        // socket.emit('playerScores', playerScore)
        io.emit('playerScores', playerScore)
    })
})

httpServer.listen(3000, () => {
    console.log('server is connected');
})