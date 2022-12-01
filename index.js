require('dotenv').config()
const express = require("express");
const Likes_Router = require('./routes/likes.router');
const Posts_Router = require('./routes/posts.router');
const Users_Router = require('./routes/users.router');
const app = express();

app.use(express.json())
app.use(Users_Router)
app.use(Posts_Router)
app.use(Likes_Router)

const PORT = process.env.PORT || 5000

app.listen(PORT,(req,res)=>{
    console.log(`Your server is listening on http://localhost:${PORT}`);
})