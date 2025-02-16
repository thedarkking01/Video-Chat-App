const express = require('express');  
const app = express();
const http = require('http'); 
const server = http.createServer(app);  
const cors = require('cors'); 
const { Socket } = require('socket.io');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

app.use(cors()); 

const PORT = process.env.PORT || 5000;

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running');
});

io.on('connection',(Socket)=>{
    Socket.emit('me ',Socket.id);

    Socket.on('disconnect',()=>{
        Socket.broadcast.emit('callended');
        console.log(`User ${Socket.id} disconnected`);
    });

    Socket.on('calluser',({userToCall,signalData,from,name})=>{
        io.to(userToCall).emit('calluser',{signal:signalData,from,name});
    });

    Socket.on('answeruser',(data)=>{
        io.to(data.to).emit('answeruser',data.signal);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
