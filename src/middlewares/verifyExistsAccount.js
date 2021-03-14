const { customers } = require('../util')

function verifyIfExistsAccount(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: 'user not found' });
  }

  req.customer = customer;

  return next()
  
};

module.exports = verifyIfExistsAccount 
