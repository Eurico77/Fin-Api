const { Router } = require('express')
const { v4: uuid } = require('uuid');
const { customers, getBalance } = require('../util')
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

routes.get('/statements', verifyIfExistsAccount, (req, res) => {
  const { customer } = req
  return res.json(customer.statement)
})

routes.post('/deposit', verifyIfExistsAccount, (req, res) => {
  const { amount, description } = req.body
  const { customer } = req;

  const statementOperation = {
    amount,
    description,
    created_at: new Date(),
    type: 'credit'
  }
  customer.statement.push(statementOperation)

  return res.status(201).send()

})

routes.post('/withdraw', verifyIfExistsAccount, (req, res) => {
  const { amount } = req.body
  const { customer } = req

  const balance = getBalance(customer)

  if(balance < amount) {
   return res.status(400).json({error: 'Insuficient found!'})
  }

  const statementOperation = {
    amount,
    updated_at: new Date(),
    type: 'debit'

  }
  customer.statement.push(statementOperation)
  return res.status(201).send()

})

module.exports = routes 