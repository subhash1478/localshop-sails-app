module.exports = {

  attributes: {
    product_category: {
      model:'ProductCategory'
    },
    title: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    status: {
      type: 'number',
      required: true
    },
    offerprice: {
      type: 'number',
      required: true
    },
    discount: {
      type: 'number',
      required: true
    },

  },

};
