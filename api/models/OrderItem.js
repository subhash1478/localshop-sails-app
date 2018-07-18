module.exports = {

  attributes: {
    orderid: {
      type: 'string',
      required: true
    },
    productid: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    sellerid: {
      type: 'string',
      required: true
    },

    quantity: {
      type: 'number',
      required: true
    },
    sgst: {
      type: 'number',
      required: true
    },
    cgst: {
      type: 'number',
      required: true
    },
    containercharges: {
      type: 'number',
      required: true
    },
  },

};
