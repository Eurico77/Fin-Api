const { Router } = require('express')
const { v4: uuid } = require('uuid');

const routes = Router()
const costumers = [];

routes.post('/account', (req, res) => {
   const { cpf, name } = req.body

   const cpfAlreadExists = costumers.find(costumer => costumer.cpf === cpf)

    if(cpfAlreadExists){
     return  res.status(400).json({ message: 'cpf já cadastrado'})

   }

   costumers.push({
       id: uuid(),
       name,
       cpf,
       statement: []
   })

   return res.status(201).send()


})

routes.get('/statements/:cpf', (req, res) => {
    const { cpf } = req.params

    
})

module.exports = routes