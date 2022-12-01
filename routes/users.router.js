const express = require("express");
const Users_Router = express.Router();
const { SIGNUP, LOGIN } = require("../controllers/users.controllers");


Users_Router.post("/signup",SIGNUP)
Users_Router.post("/login",LOGIN)


module.exports = Users_Router