const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket= require("socket.io");
const port=process.env.PORT;
const io=socket(server,{
    cors:{
        origin:"*",
        
    }
})


app.get('/',(req,res)=>{
    res.send("Thesis web site ppppp")
});
server.listen(port, () =>
{
    console.log(`Listening to port ${port}`);
    global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatsocket=socket;
    socket.on("addUser",(id)=>{
        onlineUsers.set(id,socket.id);
    })
    socket.on("send-msg",(date)=>{
        const sendUserSocket=onlineUsers.get(date.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",date.message);
        }
    })
})
})