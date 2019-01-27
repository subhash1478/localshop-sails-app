module.exports = {
  tableName: 'reviews',
  attributes: {
      comment:{ type: 'string', required: true },
      rating:{ type: 'number', required: true },
      userid:{ model:'Users' },
      type:{ type: 'string', required: true },
      promoterid:{ model:'Promoter'},
      postid:{model:'Post'  },
      status:{ type: 'number',defaultsTo: 0,allowNull: true    },
 
    },
};
