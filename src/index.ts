import express from "express";
import http from 'http';
import dotenv from "dotenv";
import WebSocket from 'ws';

// initialize configuration
dotenv.config();

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    // connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        // log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    // send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

// start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address()} :)`);
});
