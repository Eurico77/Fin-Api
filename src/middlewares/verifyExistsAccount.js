const { customers } = require('../util')

function verifyIfExistsAccount(req, res, next) {
  try { 

    const { cpf } = req.headers;
  
    const customer = customers.find((customer) => customer.cpf === cpf);
  
    if (!customer) {
      return res.status(400).json({ error: 'user not found' });
    }
  
    req.customer = customer;
  
    return next()
    
  } catch (error) {
    throw new Error(error)
  }
  
  
};

module.exports = verifyIfExistsAccount 
