const sup = (req,res,next) =>{
        console.log('sup')
        next();
}

const how = (req,res,next) =>{
    console.log(`how are you ?${req.method}`);
    next();
}

module.exports = {sup,how}