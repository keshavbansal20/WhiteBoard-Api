const cors = require("cors");
const express = require("express")
const app = express();
app.use(cors());
const http = require("http").createServer(app);
const io = require("socket.io")(http , {cors:{
    origin:`*`,
}});
io.on("connection" ,  function(socket){
    console.log(`${socket.id} connected`);

    socket.on("mousedown", function(data){
        socket.broadcast.emit("md",data);
    })

    socket.on("mousemove" , function(data){
        socket.broadcast.emit("mm", data);
    });
});

app.get("/", function(req,res){
    res.send("<h1>Welcome to home page !!! </h1>");
})

http.listen(3000, () =>{
    console.log("listening on *: 3000");
})