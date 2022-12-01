const mongoose = require("mongoose")
require("../config/db_connection")

const likes_schema = mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    user_id:{
        type:Number,
        required:true
    },
    post_id:{
        type:Number,
        required:true
    },
    like:{
        type:Boolean,
        required:true
    }
})

const likes = mongoose.model('likes', likes_schema)

module.exports = likes