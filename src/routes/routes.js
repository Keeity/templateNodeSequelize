const { Router } = require("express");
const userRoutes = require("./user.routes");

const routes = Router()

//Se previr assim, não precisa acrescentar /users lá nas user.routes
routes.use('/users', userRoutes) 



module.exports = routes