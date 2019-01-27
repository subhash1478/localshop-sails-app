module.exports = {
  attributes: {
    product_category: {model:'ProductCategory'},
    title: {type: 'string',required: true},
    price: {type: 'number',required: true},
    status: {type: 'number',defaultsTo: 1},
    image:{type: 'string'},
    offerprice: {type: 'number',required: true},
    discount: {type: 'number',required: true},
    active: {
      type : "boolean",
      defaultsTo : true
    },

  },
};
