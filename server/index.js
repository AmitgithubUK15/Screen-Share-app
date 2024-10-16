const { app ,server} = require("./socket/socket.client");
const cors = require('cors');


app.use(cors('http://localhost:5173'));

server.listen(8080,()=>{
    console.log("server is started");
})