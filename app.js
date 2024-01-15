require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const tokenManager = require('./token-manager.js')
const queries = require("./queries.js")
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "/public")))

const dbString = process.env.DATABASE_URL

mongoose.connect(dbString)

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('MongoDB is connected!')
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "public/html/instagram.html"))
})


app.get("/posts", tokenManager.authenticateToken, queries.getPosts)

app.get("/post/:id", tokenManager.authenticateToken, queries.post)

app.post("/createpost",tokenManager.authenticateToken, queries.createPost)

app.put("/updatepost/:id",tokenManager.authenticateToken, queries.updatePost)

app.delete("/deletepost/:_id",tokenManager.authenticateToken, queries.deletePost)

app.post("/posts/:id/like",tokenManager.authenticateToken, queries.likePost)

app.post("/posts/:id/unlike",tokenManager.authenticateToken, queries.unlikePost)

app.get("/post/:id/comments",tokenManager.authenticateToken, queries.getComments)

app.post("/post/:id/comment",tokenManager.authenticateToken, queries.createComment)

app.delete("/post/:id/comment",tokenManager.authenticateToken, queries.deleteComment)

//get users
app.get("/users",tokenManager.authenticateToken, queries.getUsers)

//get username
// app.get("/users/:username", tokenManager.authenticateToken, queries.getUserName)

//get info about a specific user
app.get("/user/:userid",tokenManager.authenticateToken, queries.getUserById)

// register a new user
app.post("/newuser", queries.newUser)

// delete user(only delete yourself) 
app.delete("/user/:userid", tokenManager.authenticateToken, queries.deleteUser)

// update a users info
app.put("/user/:userid",tokenManager.authenticateToken,  queries.updateUser)
app.put("/user/email/:userid",tokenManager.authenticateToken, queries.updateEmail)
app.put("/user/name/:userid", tokenManager.authenticateToken, queries.updateName)
app.put("/user/password/:userid",tokenManager.authenticateToken, queries.changePassword)

//be able to login

app.post("/login", queries.userLogin)

//think about things you shouldn and shouldn't be able to do without logging in 

app.listen(3000)
console.log("Express is working")

//npm i jsonwebtoken
//run node - just type node in the terminal 
//require('crypto').randomBytes(64).toString('hex')
//will generate our string/token 
//save code in the .env file 
//ctrl c twice to get out of the node console 