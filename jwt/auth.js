const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifytoken = (req, res, next)=>{
    
    if(req.headers.cookie === undefined) return res.send({'status': 'error', 'message': 'invalid auth.'})
    const token = req.headers.cookie.split('=')[1]
    if (token){
        const token_data = jwt.verify(token, process.env.SECRET_KEY)
        res.tokendata = token_data
        console.log(token_data,'YES THIS IS WORKING...');
        return next();
    }
    return res.send({'status': 'error', 'message': 'invalid auth.'})
}

module.exports = {verifytoken}  