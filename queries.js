const Model = require("./schema.js")
const Pool = require('pg').Pool
const tokenManager = require('./token-manager.js')
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE, 
    password: process.env.PASSWORD,
    port: 5432
    })

async function getPosts(req, res) {
const data = await Model.find()
res.status(200).json(data)
}

async function post(req, res) {
   const id = req.params.id
   const post = await Model.findById(id)
   res.status(200).json(post)
}



/*  async function */
async function createPost(req, res) {
    await pool.query('SELECT username FROM users WHERE userid = $1', [req.user], (async (error,results) => {
        if(error){
            throw error
        }
    let username = results.rows[0].username
    const post = new Model({
        userid: req.user,
        username: username,
        image: req.body.image, 
       timestamp: Date.now()
      
    })
    if(req.body.caption){ 
        console.log(req.body.caption)
        post.caption = req.body.caption
    }
    const savePost = await post.save()
    res.status(200).json(savePost)
}))
}


async function updatePost(req, res) {
    const id = req.params.id
    const newData = req.body
    const options = {new: true}

    const data = await Model.findByIdAndUpdate(id, newData, options)
    res.status(200).json(data)
}

async function deletePost(req, res) {
    const id = req.params._id 
    const data = await Model.findByIdAndDelete(id)
    res.status(200).send(`User ID ${id} was deleted!`)
}

async function likePost(req, res) {
    const id = req.params.id
    const userid = req.user
    const post = await Model.findById(id)
    
    post.likes.push(userid)
    console.log(post)
    const data = await post.save()
    res.status(200).json(data)

}

async function likePost(req, res) {
    const id = req.params.id
    const userid = req.user
    const post = await Model.findById(id)
    post.likes.push(userid)
    const data = await post.save()
    res.status(200).json(data)
}

async function unlikePost(req, res) {
    const id = req.params.id
    const userid = req.user
    const post = await Model.findById(id)
   
    const index = post.likes.indexOf(userid)
    post.likes.splice(index, 1)
  
    const data = await post.save()
    console.log(post)
    res.status(200).json(data)
}

async function createComment(req, res) {
    const id = req.params.id
    const commentusername = req.body.username
    const commentcontent = req.body.content
    const commenttimestamp = Date.now()

    const post = await Model.findById(id)

    const comment = {
        username:commentusername,
        content: commentcontent,
        timestamp: commenttimestamp
    }

    post.comments.push(comment)
    const data = await post.save()
        res.status(200).json(data)
}

async function deleteComment(req, res) {
   const id = req.params.id
    commentid = req.body.commentid

   const post = await Model.findById(id)

   for(let i = 0; i < post.comments.length; i++){
    if(post.comments[i].id === commentid){
        post.comments.splice(i, 1)
    }
   }

   const data = await post.save()
    res.status(200).json(data)
}

async function getComments(req, res) { 
    const id = req.params.id
    comment = req.body.comments
  const data = await Model.findById(id)
  res.status(200).send(comment)
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
    }


async function getUserById(req,res) {
    const id = req.user
    
    await pool.query('SELECT * FROM users WHERE userid = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        console.log(results.rows)
        res.status(200).json(results.rows)
    })
}
    
    async function newUser(req,res) { 
        const username = req.body.username 
        const email = req.body.email 
        const password = req.body.password

       await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password], (error, results ) => {
            if(error){
                throw error
            }
            res.status(201).send(results.rows)


    })
}

 async function deleteUser(req,res) {
    const id = req.user
    await pool.query('DELETE FROM users WHERE userid = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).send(`User ${id} was deleted.`)
    })
 }

    
        async function updateUser(req, res) {
            const id = req.user
                const name = req.body.username
                const email = req.body.email
                const password = req.body.password
            await pool.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE userid = $4', [name, email, password, id], (error, results) => {
                    if(error){
                        throw error
                    }
                    res.status(200).send(`User ID ${id} was modified`)
                })
        }

    
        async function updateEmail(req, res) {
            const id = req.user
                const email = req.body.email 
            
               await pool.query('UPDATE users SET email = $1 WHERE userid = $2', [email, id], (error, results) => {
                    if(error){
                        throw error
                    }
                    res.status(200).send(`User ID ${id}'s email has been updated.`)
                }) 
        }


    async function updateName(req, res) {
            const id = req.user
        const name = req.body.username 
    
       await pool.query('UPDATE users SET username = $1 WHERE userid = $2', [name,id], (error, results) => {
            if(error){
                throw error
            }
            res.status(200).send(`User ID ${id}'s name has been updated.`)
        })
    }

    async function changePassword(req,res) {
         
                const id = req.user
                const password = req.body.password
        
              await pool.query('UPDATE users SET password = $1 WHERE userid = $2', [password, id], (error, results) => {
                    if(error){
                        throw error
                    }
                    res.status(200).send(`User ${id}'s password has been changed`)
                })
    }

    async function userLogin(req,res) {
        const email = req.body.email
            const password = req.body.password
    
         await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
                if(error){
                    throw error
                }
                console.log(results.rows)
                const token = tokenManager.generateAccessToken(results.rows[0].userid)
                res.status(200).json(token)
            })
    }

    


module.exports = {
 getPosts,
 post,
 createPost, 
 updatePost, 
 deletePost, 
 getComments, 
 likePost,
 unlikePost,
 createComment, 
 deleteComment,
 getUsers,
 getUserById, 
//  getUserName,
 newUser,
 deleteUser,
 updateUser, 
 updateEmail, 
 updateName, 
 changePassword,
 userLogin,
}