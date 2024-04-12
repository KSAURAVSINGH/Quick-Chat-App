const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

// router will come first as it is of higher priority than use websocket html file
app.get('/api', (req, res)=>{
    res.send("Hurray! Server connected")
})

app.use((req, res) =>
res.sendFile('/websocket-client.html', { root: __dirname + '/public' })
)

io.on('connection', (socket) => {
    console.log("User connected to web socket")
    socket.on('message', (msg) => {
      io.emit('message', msg);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

server.listen(3000, () => {
  console.log('listening on 3000');
})
















// sockserver.on('connection', ws => {
//     console.log('New client connected!')
//     ws.send('connection established')
//     ws.on('close', () => console.log('Client has disconnected!'))
//     ws.on('message', data => {
//       sockserver.clients.forEach(client => {
//         console.log(`distributing message: ${data}`)
//         client.send(`${data}`)
//       })
//     })
//     ws.onerror = function () {
//       console.log('websocket error')
//     }
//    })