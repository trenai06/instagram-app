require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const queries = require("./queries.js")
const app = express()

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "/public")));

const dbString = process.env.DATABASE_URL

mongoose.connect(dbString)

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('MongoDB is connected!')
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/instagram.html"))
})

app.get("/posts", queries.getPosts)

app.get("post/:postid", queries.post)

app.post("/createpost", queries.createPost)

app.put("/updatepost/:id", queries.updatePost)

app.delete("/deletepost/:id", queries.deletePost)

// app.post("/likes/:id", queries.likePost)

app.get("/post/getcomments/:id", queries.getComments)

app.post("/createcomment/:id", queries.createComment)

// app.delete("/deletecomment/:id", queries.deleteComment)

app.listen(3000)
console.log("Express is working")