require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_DB_URL

mongoose.connect(MONGO_URL,{ useNewUrlParser: true ,useUnifiedTopology: true},(error)=>{
    if (error) throw error.message
    console.log('database connected successfully...');
})

module.exports = mongoose