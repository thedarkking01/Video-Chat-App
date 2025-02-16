const express = require('express');  
const app = express();
const http = require('http'); 
const server = http.createServer(app);  
const cors = require('cors'); 
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

// Start the server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
