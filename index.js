const express = require("express");
const app = express();
const http = require('http');
const cors = require("cors");

// socketIO
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

//database
const mongo = require("./model/mongo");
const Chats = require("./model/schemas");

const connection = require("./model/mysql");
const multer = require("multer");
//const client = require("./model/elasticsearch");

const corsOptions = {
    origin:"http://localhost:3000",
    accessControlAllowOrigin: true,
    accessControlAllowCredentials: true,
    accessControlAllowMethods: 'GET,POST',
    accessControlAllowHeaders: 'Content-Type,Authorization',
    accessControlExposeHeaders: 'Content-Type',
    }

app.use(cors(corsOptions));
app.use(express.json());

const gett = {type:"get",data:"hello world", status:200};
const postt = {type:"post",data:"get to know world", status:200};
const upload = multer({dest:'uploads/'});

const files = require("./routes/filejs");

app.get("/", (req, res) => {
    res.send(gett);
    }
)
app.post("/", (req, res) => {
    res.send(postt);
    }
)
app.post("/file",upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.send("File uploaded");
})
app.use("/files",require("./routes/filejs"));
let ping = 0;
// chat app
io.on('connection', (socket) => {
    ping+=1;
    //console.log('a user connected',socket.id,ping);
    socket.on("sendMessage",async(data)=>{
        console.log(data);
        const chattings = new Chats({
            name:data.name,
            message:data.message
        });
        await chattings.save()
        .then((data)=>{console.log(data)})
        .catch((data)=>{console.log(data)})
        io.emit("sendMessage",data);
    })
    socket.on('disconnect', () => {
        //console.log('user disconnected',socket.id,ping);
    });
});

const connections = [3100,3200]

app.post("/chat", (req, res) => {
    console.log(req.body.Name);
    res.send("chat route");
    }
)

app.listen(connections[0], () => {
    console.log('listening on *:',connections[0]);
    });

server.listen(connections[1], () => {
    console.log('listening on *:',connections[1]);
  });