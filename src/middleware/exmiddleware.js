async function exMiddleware(req, res, next){
try {
next() 
} catch(error){
return res.status(401).send({message: "xxx",
cause: error.message
})

}
}



//para utilizar fora
module.exports = { exMiddleware }