const { Startserver } = require("./apollo/apolloclient");
const { app ,server} = require("./socket/socket.client");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Start apollo server
Startserver();

app.use(cors('http://localhost:5173'));

// Connect mongodb
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Mongodb is connected")
})
.catch((error)=>{
    console.log(error)
})

// start socket server
server.listen(8080,()=>{
    console.log("server is started");
})