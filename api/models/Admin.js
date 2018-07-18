

module.exports = {
  tableName: 'admins',

  attributes: {
    username: { type: 'string', required: true },
      email: { type: 'string', required: true },
      password: { type: 'string',  },
   },

};
