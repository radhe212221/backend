function custommiddleware(req,res,next)
{
    console.clear()
    console.log(req.url,req.method)
    next()
}


module.exports=custommiddleware