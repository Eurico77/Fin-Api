const { Router } = require('express')
const { v4: uuid } = require('uuid');
const { customers } = require('../util')
const verifyIfExistsAccount = require('../middlewares/verifyExistsAccount')

const routes = Router()

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

routes.get('/statements', verifyIfExistsAccount, (req, res, next) => {
  const { customer } = req
  return res.json(customer.statement)
})

module.exports = routes, customers 