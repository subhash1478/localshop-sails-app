 module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    viewed: {
      type: 'number',
    },
    tags: {
      type: 'string',
    },
    userid: { model:'Users'},
    phone: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    timing:  { type: 'string', columnType: 'array' },

    rating: {
      type: 'number',
    },
    location:  { type: 'json', columnType: 'array' },

    website: {
      type: 'string',
    },
    category: {
      model:'Category'
    },
  },
};
