const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/user");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);
// module.exports = io; 
app.set('io', io); 

const port = process.env.PORT || 4002;
//const connectDB = require("config.js");

app.use(express.json());
app.use(cors());
app.use("/user", router);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//Soket  connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Database connection 
const db = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose.set("strictQuery", false);  
mongoose
  .connect(db, {})
  .then(() => {
    console.log("DB connection is successfull!");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
