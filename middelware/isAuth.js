const jwt  = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        let token = await req.get('Authorization') && req.get('Authorization').split(' ')[1];
        if(!token){
            res.json({
                success:"false",
                message:"Token is not available"
            })
        }
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if(decodedToken){
           req.userId = decodedToken.user
           next(); 
        }
        else{
            res.status(404).json({
                success:"false",
                message:"Mismatch found in token"
            })
        }
    }
    catch(error){
        res.status(404).json({
            success:"false",
            message:error.message
        })
    }
}   