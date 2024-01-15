const mongoose = require('mongoose')
const sub = require("./subschema.js")
// const commentSchema = new mongoose.Schema({
//     username: {
//         required: true, 
//         type: String
//     }, 
    
//     content: {
//         required: true, 
//         type: String
//     }, 

//     // timestamp:{
//     //     required: true, 
//     //     type: Number
//     // }
// });

const postSchema = new mongoose.Schema({
    userid: {
        required:true, 
        type:String
    }, 
   
    username:{
        required: true, 
        type: String
    }, 

    image:{ 
        required: true, 
        type: String
    }, 

    caption:{
        required: false, 
        type: String
    }, 

    likes:{
        required: false, 
        type: [String]
    },
    
    comments:{
        required: false, 
        type:[sub.schema]
    },
    
    timestamp:{
        required: true, 
        type: Number
    }

})



module.exports = mongoose.model('Data', postSchema)