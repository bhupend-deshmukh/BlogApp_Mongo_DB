const users = require("../models/users.model");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

const SIGNUP = async(req,res)=>{
    try {
        const {first_name,last_name,email} = req.body
        req.body.password = bcrypt.hashSync(req.body.password,10)
        if(first_name === undefined || last_name === undefined || email === undefined || req.body.password === undefined){
           return res.send({status:false,message:"body data is empty..."})
        }
        const AllData = await users.find()
        if(AllData.length > 0){
            const all_Ids = []
            AllData.filter((ele)=>{
                all_Ids.push(ele.id)
            })
            all_Ids.sort(function(a,b){return a-b});
            let length_of_allData = all_Ids.length
            let id = all_Ids[length_of_allData-1]
            const result = await users.insertMany([{id:id+1,first_name,last_name,email,password:req.body.password}])
            res.send({status:true,user_detail:{id:id,first_name:first_name,last_name:last_name,email:email},message:"User SIGN-UP Successfully..."})
        }
        else{
            const result = await users.insertMany([{id:1,first_name,last_name,email,password:req.body.password}])
            console.log(result);
            res.send({status:true,user_detail:{id:result[0].id,first_name:first_name,last_name:last_name,email:email},message:"User SIGN-UP Successfully..."})
        }
    } catch (error) {
        if(error.code === 11000){
            res.send({status:false,message:'this users/email allready exists....'})
        }else{
            console.log(error.message);
            res.send({status:false,message:error})
        }
    }
}

const LOGIN = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(email === undefined || password === undefined){
            return res.send({status:false,message:"body is empty..."})
        }
        const result = await users.findOne({email:email})
        if(result === null){
            res.send({status:false,message:"Envalid Email || Password..."})
        }else{
            if(bcrypt.compareSync(password,result.password)){
                const JWT_TOKEN = JWT.sign({ id: result.id,email:result.email}, process.env.SECRET_KEY);
                res.cookie("JWT_TOKEN", JWT_TOKEN);
                res.send({
                    status: "success",
                    message: "Login Successfully...",
                    user_details: {
                        id:result.id,
                        first_name:result.first_name,
                        last_name:result.last_name,
                        email:result.email
                    }
                });
            }else{
                return res.send({status:false,message:"Invalid email or password..."})
            }
        }
    } catch (error) {
        console.log(error);
    }
}       

module.exports = {SIGNUP,LOGIN}