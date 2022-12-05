const likes = require("../models/likes.model");
const posts = require("../models/posts.model");

const CREATE_POST = async(req,res)=>{
    try {
        let user_id = res.tokendata.id
        const {title,description} = req.body
        if(title === undefined || description === undefined){
            res.send({status:false,message:"body data is empty...."})
        }
        const All_Data = await posts.find()
        if(All_Data.length > 0){
            const all_Ids = []
            All_Data.filter((ele)=>{
                all_Ids.push(ele.id)
            })
            all_Ids.sort(function(a,b){return a-b});
            let length_of_allData = all_Ids.length
            let id = all_Ids[length_of_allData-1]
            const result = await posts.insertMany([{id:id+1,title,description,user_id:user_id}])
            console.log(result);
            res.send({
                status:true,
                message:"post created successfully...",
                post_details:result
            })
        }else{
            const result = posts.insertMany([{id:1,user_id:user_id,title,description}])
            res.send({
                status:true,
                message:"post created successfully...",
                post_details:result
            })
        }
    } catch (error) {
        console.log(error);
        res.send({status:false,message:error.message})
    }
}

const GET_ALL_POSTS = async(req,res)=>{
    try {
        const All_Data = await posts.find()
        if(All_Data.length > 0){
            return res.send({
                status:true,
                message:"all posts data fetched successfully...",
                count:All_Data.length,
                all_posts_details:All_Data
            })
        }else{
            res.send(All_Data)
        }
    } catch (error) {
        console.log(error);
        res.send({status:false,message:error.message})
    }
} 

const GET_BY_ID = async(req,res)=>{
    try {
        let id = parseInt(req.params.id)
        const result = await posts.findOne({id:id})
        if(result !== null){
            const post_like = await likes.find({post_id:id})
            return res.send({status:true,count:1,all_posts_details:result,likes:post_like.length})
        }else{
            return res.send({status:false,message:"id not found..."})
        }
    } catch (error) {
        console.log(error)
        res.send({status:false,message:error.message})
    }
}

const UPDATE_BY_ID = async(req,res)=>{
    try {
        const {title,description} = req.body
        if(title === undefined || description == undefined){
            return res.send({status:false,message:"body data is empty..."})
        }
        let id = parseInt(req.params.id)
        let user_id = res.tokendata.id
        const result = await posts.findOne({id:id})
        if(result !== null){
            if(result.user_id !== user_id) return res.send({status:true,message:'you dont have permision for update this post, because you are not owner this post....'})
            const update_data = await posts.updateOne({id:id},{title:title,description:description})
            return res.send({status:true,message:'data updated successfully...'})
        }else{
            return res.send({status:false,message:"id not found..."})
        }
    } catch (error) {
        res.send({status:false,error:error.message})
    }
}

const DELETE_BY_ID = async(req,res)=>{
    try {
        let id = parseInt(req.params.id)
        let user_id = res.tokendata.id
        const result = await posts.findOne({id:id})
        const post_like = await likes.find({post:id})
        if(result !== null){
            if(result.user_id !== user_id) return res.send({status:true,message:'you dont have permision for update this post, because you are not owner this post....'})
            if(post_like.length > 0){
                const delete_post = await posts.deleteOne({id:id})
                const delete_like = await likes.deleteMany({post_id:id})
                return res.send({status:true,message:'data deleted successfully...'})
            }else{
                const update_data = await posts.deleteOne({id:id})
                return res.send({status:true,message:'data deleted successfully...'})
            }
        }else{
            return res.send({status:false,message:"id not found..."})
        }
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}

module.exports = {CREATE_POST,GET_ALL_POSTS,GET_BY_ID,UPDATE_BY_ID,DELETE_BY_ID}