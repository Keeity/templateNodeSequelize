//utiliza classe para criar controller. Dentro da classe, consegue ter 1) Construtor - primeira coisa que é executada quando chama a classe; 2) Métodos - ex listar(), 3) Atributos - variáveis
const User = require("../models/User")
class UserController {

// Método - dentro de uma classe, para criar um método, não precisa iniciar com function, bastando colocar o nome
async register(req,res) { 

          /*  
            #swagger.tags = ['User'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo User',
                schema: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', example: "teste123@gmail.com" },
                        password: { type: 'string', example: "teste123" },
                        nome: { type: 'string', example: "Novo User" },
                       data_nascimento: { type: 'string', example: "1996-12-15" },
                        celular: { type: 'string', example: "48 9 9999 9999" }
                    }
                }
            */
        
  try {
        const email = req.body.email
       const password = req.body.password
       const nome = req.body.nome 
         const data_nascimento = req.body.data_nascimento //tem que passar ano-mês-dia
       const celular = req.body.celular
   
   if(!email) {
     return res.status(400).json({message:'O email é obrigatório!'}) 
   }
   
   if(!password) {
     return res.status(400).json({message:'A senha é obrigatória!'})
   }
   
   if(!nome) { 
      return res.status(400).json({message:'O nome é obrigatório!'})
   }
   
   if(!data_nascimento) {
     return res.status(400).json({message:'A data de nascimento é obrigatória!'}) 
   }
     // Rejex - é recurso nativo = verificar se uma data está no formato "aaaa-mm-dd"
     if(!(data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm))) {
       return res.status(400).json({message:'A data de nascimento não está no formato correto!'})
     }
     const emailexistente = await User.findOne({ 
            where: {
       email: email
        }  
          })
      if(emailexistente) { 
        return res.status(409).json({message: "Email já cadastrado"}) 
      }  
     const userexistente = await User.findOne({ 
      where: {
        nome: nome
        }  
          })
      if(userexistente) { 
        return res.status(409).json({message: "Nome de User já cadastrado"})  
      }
     const user = await User.create({ 
      email: email, 
      password: password,
       nome: nome,
           data_nascimento: data_nascimento,
           celular: celular

   }) 
   res.status(201).json(user) 
     } catch (error) { 
   console.log(error.message) 
     res.status(500).json({error: 'Não foi possível cadastrar o usuário'})
   }
   
} 

// //Lista users com filtro
async list (req, res) {
  try {
    let params = {};
    if(req.query.nome) {
      params = {...params, nome: { [Op.iLike]: '%' + req.query.nome + '%' }} //ilike ignora maiuscula/minuscula
    }
    const users = await User.findAll({ where: params });

    if(users.length > 0)  {
      console.log(`Listando ${req.query.nome ? 'apenas os users filtrados a partir de ' + req.query.nome : 'todos os users'}`); //expressão ternária que substitui if else - Se req.query.nome for verdadeiro, retorna 'apenas os users filtrados a partir de ' + req.query.nome. Caso contrário, retorna 'todos os users'.
      return res.status(200).json(users);
    } else {
      console.log(`Nenhum user encontrado com o parâmetro fornecido (${req.query.nome}).`);
      return res.status(404).json({error: 'Nenhum user encontrado'});
    }
  }
   catch (error) {
    console.error(`Erro ao filtrar users: ${error}`)
    return res.status(500).json({error: 'Erro interno do servidor'})
  }
}


async listById (req,res) {
  try {
    const { id} = req.params
    const user = await User.findByPk(id)
    if(!user) {
      return res.status(404).json({ message: "Usuário não encontrado!"})
    }
  res.json(user) //se não escreve nada, ele reconhece 200
  
  } catch (error) {
    console.error(`Erro ao buscar users: ${error}`);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }

}

async update(req,res) { 
  try {
    const id = req.params.id;
  const user = await User.findByPk(id)
  
  if(!user){
    return res.status(404).json({error: 'User não encontrado.'})
  }
  user.update(req.body)
  await user.save()
  console.log("Alteração realizada com sucesso!")
  res.status(200).json(user)
  } catch (error) {
    console.error(`Erro ao tentar alterar: ${error}`);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
}

async partialUpdate(req,res) { 
  try {
    const  id = req.params.id;
  const celular = req.body.celular;
   const user = await User.findByPk(id)
  
    if (!user) {
  return  res.status(404).json({ error: 'User não encontrado.'})
    }
  
  user.celular = celular;
  await user.save()
  console.log("Alteração realizada com sucesso!")
  res.status(200).json({ message: `User id ${id} teve o celular alterado para ${celular} com sucesso!`});
  } catch (error) {
    console.error(`Erro ao tentar atualizar: ${error}`);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }  
}

async delete(req,res) { 
  try{
    const { id } = req.params;   //ou const id = req.params.id
   const user = await User.findByPk(id);
   if(!user) {
    return res.status(404).json({error:`User ID ${id} não encontrado.`})
     }
   await user.destroy() 
    
    res.status(204).json({message: `User ID ${id} deletado com sucesso!`})
  } catch (error) {
    console.error(`Erro ao tentar excluir: ${error}`);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
  
}

}

module.exports = new UserController() //já exportar a classe com New, porque daí ela já fica pronta para uso.