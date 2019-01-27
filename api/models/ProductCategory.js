module.exports = {
  tableName: 'productcategories',

  attributes: {
    title: { type: 'string', required: true },
     shopid: { model: 'Post'  },
},
};
