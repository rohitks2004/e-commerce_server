const jwt = require('jsonwebtoken')

const auth =  (req,res,next) =>{
    if(!req.header("Authorization")){
     return res.status(401).json({error:"No Auth found authorisation denied"});

    }
    const token = req.header("Authorization").split(' ')[1]
    if(!token){
        res.status(401).json({error:'No token found authorisation denied'});
    }
    try{
        const decoded = jwt.verify(token,"secret_token");
        req.user = decoded;
        next()
    }catch(e){
        res.status(400).json({error:"Token is not verified"});
    }
}
module.exports = auth;