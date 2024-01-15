const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    username: {
        required: true, 
        type: String
    }, 
    
    content: {
        required: true, 
        type: String
    }, 

    timestamp:{
        required: true, 
        type: Number
    }
});

module.exports = mongoose.model('sub', commentSchema)