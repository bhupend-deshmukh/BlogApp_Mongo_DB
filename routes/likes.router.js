const express = require("express");
const { GET_ALL_LIKES, LIKES } = require("../controllers/likes.controller");
const { verifytoken } = require("../jwt/auth");
const Likes_Router = express.Router();

Likes_Router.get("/likes/get_all_likes",verifytoken,GET_ALL_LIKES)
Likes_Router.post("/likes/like",verifytoken,LIKES)

module.exports = Likes_Router