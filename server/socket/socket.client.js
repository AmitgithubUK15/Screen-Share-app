var express = require("express");
var {Server} = require("socket.io");
var {createServer, get} = require("http");

var app = express();
var server = createServer(app);
var active_Socket_Map = new Map();

var io = new Server(server,{
  cors: {
    origin:'http://localhost:5173',
    methods: ["GET", "POST"],
  }    
});

io.on("connection",(socket)=>{
  console.log("connect new socket",socket.id);
  const userid = socket.handshake.query.userID
    
  // socket.emit("msg","hello i am from server");
  // socket.on("msg",(msg)=>{
  //     console.log(msg);
  // })

  // socket.on("joinroom",({email,room})=>{
  //   active_Socket_Map.set(email,socket.id);
  //     socket.join(room);
  //     io.to(room).emit("message",`Welcome in room ${email}`);
  // })

  active_Socket_Map.set(userid,socket.id);

  socket.on("incomming:call",({offer,UserId})=>{
     console.log(offer,UserId);
     const getuser = active_Socket_Map.get(UserId);
     socket.to(getuser).emit("incomming:handle",{offer,from:socket.id});
  })

  socket.on("call:accepted",({answer,to})=>{
      console.log(answer,to);
      socket.to(to).emit("call:accepted",answer,socket.id);
  });


  socket.on("peer:nego:needed", ({offer,to}) => {
      // console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      // console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

  socket.on("disconnect",()=>{
    console.log("socket disconnect")
  })
})

module.exports = {
    app,
    io,
    server,
    active_Socket_Map
}
