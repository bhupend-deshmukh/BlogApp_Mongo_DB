const mongoose = require("mongoose");
require("../config/db_connection")

const users_schema = mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
     type:String,
     unique:true,
     required:true
    },
    password:{
        type:String,
        required:true
    }
})

const users = mongoose.model('users', users_schema)

module.exports = users