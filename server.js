const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/join-room', (req, res) => {
    const username = req.body.username;
    const roomId = req.body.roomId || uuidv4();
    res.redirect(`/${roomId}?username=${username}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room, username: req.query.username });
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId, username) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId, username);

        socket.on('message', (message, username) => {
            io.to(roomId).emit('createMessage', message, username);
        });

        socket.on('disconnect', () => {
            console.log("user disconnected");
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
});

server.listen(3500, () => {
    console.log('Server is running on port 3500');
});
