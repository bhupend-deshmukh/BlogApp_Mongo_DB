const likes = require("../models/likes.model");
const posts = require("../models/posts.model");

const GET_ALL_LIKES = async(req,res)=>{
    try {
        const result = await likes.find()
        if(result.length === 0) return res.send({status:false,message:'dont exists any likes...'})
        if(result.length > 0){
            res.send({status:true,message:"all likes fetched true...",likes_count:result.length,likes:result})
        }
    } catch (error) {
        console.log(error);
        res.send({status:true,message:error.message})
    }
}

const LIKES = async(req,res)=>{
    try {
        let user_id = res.tokendata.id
        const  {post_id,like} = req.body
        const postsData = await posts.findOne({id:post_id})
        if(postsData){
            const check_like = await likes.find({post_id:post_id,user_id:user_id})
            if(check_like.length > 0){
                const update_like = likes.updateOne({post_id:post_id,user_id:user_id},{like:like})
                return res.send({status:true,message:"post liked successfully..."})
            }else{
                const get_like = await likes.find()
                if(get_like.length > 0){
                    const all_Ids = []
                    get_like.filter((ele)=>{
                        all_Ids.push(ele.id)
                    })
                    let length_of_all_id = all_Ids.length
                    let id = all_Ids[length_of_all_id-1]
                    const result = await likes.insertMany([{id:id+1,user_id:user_id,post_id:post_id,like}])
                    return res.send({status:true,message:"post liked successfully..."})
                }else{
                    console.log('else me aa rha hai....');
                    const result = await likes.insertMany([{id:1,post_id:post_id,user_id:user_id,like:like}])
                    return res.send({status:true,message:"post liked successfully..."})
                }
            }
        }else{ 
            return res.send({status:false,message:'invalid post id.....'})
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {GET_ALL_LIKES,LIKES}