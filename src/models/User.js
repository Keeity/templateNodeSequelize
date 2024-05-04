// Esse arquivo serve para conectar à tabela que quer mexer.
// Nomear com letra maiúscula no singular.

const { DataTypes } = require('sequelize') 
const { connection } = require('../database/connection')

//Define a variável que representa a conexão com a tabela do banco de dados
const User = connection.define('users', { 
    email: {
    unique: true,
    type: DataTypes.STRING
},
    password: {
    type: DataTypes.STRING
},
    nome: { //define cada coluna da tabela que se quer manipular - visualizar ou acessar. ID não precisa
    type: DataTypes.STRING 
},
    data_nascimento: {
    type: DataTypes.DATE 
} ,
celular: {
    type: DataTypes.STRING
},
//Se quisesse fazer referência a outra tabela
access_id: {
    type: DataTypes.INTEGER,
    references: {  
        model: Access,
        key: 'id'
    }
} 
}
,{paranoid: true}// é o soft delete do sequelize. faz registro no bdd

)




//se tiver chave estrangeira
Spot.hasMany(User, {foreignKey: 'user_id'}) //modelo de um para muitos. 
User.belongsTo(Spot, {foreignKey: 'user_id'}) // Cada spot tem apenas um user

//para usar em qualquer lugar, exporta
module.exports = User
