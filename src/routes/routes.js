const { Router, response } = require('express')
const { v4: uuid } = require('uuid');

const routes = Router()
const customers = [];

routes.post('/account', (req, res) => {
   const { cpf, name } = req.body

   const cpfAlreadExists = customers.some(
     costumer => costumer.cpf === cpf
    )

    if(cpfAlreadExists){
     return  res.status(400)
     .json({ message: 'cpf já cadastrado'})
   }

   customers.push({
       id: uuid(),
       name,
       cpf,
       statement: []
   })

   return res.status(201).send()

})

routes.get('/account', (req, res) => {
  return res.json(customers)
})

routes.get('/statements/:cpf', (req, res) => {
    const { cpf } = req.params

    const customer = customers.find( customer => customer.cpf === cpf)

    return res.json(customer.statement)
})

module.exports = routes