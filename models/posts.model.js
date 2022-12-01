const mongoose = require("mongoose")
require("../config/db_connection")

const posts_schema = mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id:{
        type:Number,
        required:true
    }
})  

const posts = mongoose.model('posts', posts_schema)

module.exports = posts