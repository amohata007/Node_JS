const adminAuth = (req,res,next)=>{
    let token = 'abcd';
    let isAuth = token === 'abcd';
    if(!isAuth){
        res.status(401).send("Unauthorized");
    }
    else{
        next();
    }
}

module.exports = {adminAuth};