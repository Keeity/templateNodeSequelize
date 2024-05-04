const {Router, query} = require('express');
const UserController = require('../controllers/userController');

const userRoutes = new Router; 

//cadastrar user na tabela de banco de dados
userRoutes.post('/', UserController.register)

//listar users com possibilidade de filtro
userRoutes.get('/', auth, UserController.list)

//filtrar user por id route params
userRoutes.get('/:id', auth, UserController.listById)

//PUT - altera user por id
userRoutes.put('/:id', auth, UserController.update)

// Atualização parcial de um User - celular
userRoutes.patch('/:id', UserController.partialUpdate);

//deleta user por id - com validação
userRoutes.delete('/:id', UserController.delete)  

//exporta
module.exports = userRoutes // é o mesmo que: export default userRoutes