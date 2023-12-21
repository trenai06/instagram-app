const Model = require("./schema.js")


async function getPosts(req, res) {
const data = await Model.find()
res.status(200).json(data)
}

async function post(req, res) {
   const postid = req.params.postid
   const post = await Model.find(postid)
   res.status(200).json(post)
}

async function createPost(req, res) {
    const post = new Model({
        
        username: req.body.username,
        image: req.body.image, 
        caption: req.body.caption, 
        likes: req.body.likes, 
        comments: req.body.comments
        //timestamp??
      
    })
    const savePost = await post.save()
    res.status(200).json(savePost)
}


async function updatePost(req, res) {
    const id = req.params.id
    const newData = req.body
    const options = {new: true}

    const data = await Model.findByIdAndUpdate(id, newData, options)
    res.status(200).send(data)
}

async function deletePost(req, res) {
    const id = req.params.id 
    const data = await Model.findByIdAndDelete(id)
    res.status(200).send(`User ID ${id} was deleted!`)
}

// async function likePost(req, res) {

// }

async function getComments(req, res) { 
    const id = req.params.id
    comment = req.body.comments
  const data = await Model.findById(id)
  res.status(200).send(comment)

}

async function createComment(req, res) { 


})


    // const id = req.params.id

    // const comment = req.body.comments
    //     commentSchema = new Model({ 
    //         username: comment.username,
    //         content: comment.content, 
    //     })


//     const saveCommentSchema = await commentSchema.save()
// const comment = []
// comment.push(saveCommentSchemacommentSchema)
//     res.status(200).json(comment)
}

// async function deleteComment(req, res) {

// }


module.exports = {
 getPosts,
 post,
 createPost, 
 updatePost, 
 deletePost, 
 getComments, 
 createComment, 
}