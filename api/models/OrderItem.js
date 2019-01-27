module.exports = {
  
  attributes: {
    orderid: {type: 'string'},
    userid: {model:'Users'},
    productid: {model:'Product'},
    price: {type: 'number'},
    shopid: {model:'Post'},
    quantity: {type: 'number'},
    status: {type: 'number'},
    
  },
  
};
