var express = require("express");
var {Server} = require("socket.io");
var {createServer} = require("http");

var app = express();

var server = createServer(app);

var io = new Server(server,{
  cors: {
    origin:'http://localhost:5173',
    methods: ["GET", "POST"],
  }    
});

io.on("connection",(socket)=>{
    console.log("new socket",socket.id);

    socket.emit("message","hello")
})

module.exports = {
    app,
    io,
    server
}
