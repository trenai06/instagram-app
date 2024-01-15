require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken(userid) {
    //first parameter -  something we want to encyrpt into our data
    //second parameter - token secret
    //ooptions you want to include (expirations and such) - can be left empty with curly brackets
    return jwt.sign(userid, process.env.TOKEN_SECRET, {})
}

 function authenticateToken(req, res, next) {
//will get the authorization header's value
    const token = req.get('Authorization')

    if(token === null) {
        return res.sendStatus(401)
    }
     
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if(error){
            return res.sendStatus(405)
            //405 means someting is bad
        }
        req.user = user
        next()
        //ties specific users to specific requests
    })
    //validate the token and extract the data that is inside of the token 
    //takes three parameters - token you want to verify, secret key that is being compared to the token, an anonymous function that tells it what happens when it is done 
 }
module.exports = {
    generateAccessToken,
    authenticateToken
}
