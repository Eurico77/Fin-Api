module.exports = {
    customers: [],
    getBalance: ({ statement }) => {
        const result = statement.reduce((acc, index) => {
            if(index.type === 'credit') {
                return  acc + index.amount 

            }else {
              return acc - index.amount  
            }  
        }, 0)

        return result;
    }
}