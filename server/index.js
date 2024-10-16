const { Startserver } = require("./apollo/apolloclient");
const { app ,server} = require("./socket/socket.client");
const cors = require('cors');


// Start apollo server
Startserver();

app.use(cors('http://localhost:5173'));

// start socket server
server.listen(8080,()=>{
    console.log("server is started");
})