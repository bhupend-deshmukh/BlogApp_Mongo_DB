const express = require("express");
const Posts_Router = express.Router();
const { verifytoken } = require("../jwt/auth");
const { CREATE_POST, GET_ALL_POSTS, GET_BY_ID, UPDATE_BY_ID, DELETE_BY_ID } = require("../controllers/posts.controllers");

Posts_Router.post("/posts/creat_post",verifytoken,CREATE_POST)
Posts_Router.get("/posts/get_all_posts",verifytoken,GET_ALL_POSTS)
Posts_Router.get("/posts/get_by_id/:id",verifytoken,GET_BY_ID)
Posts_Router.put("/posts/update_by_id/:id",verifytoken,UPDATE_BY_ID)
Posts_Router.delete("/posts/delete_by_id/:id",verifytoken,DELETE_BY_ID)

module.exports = Posts_Router