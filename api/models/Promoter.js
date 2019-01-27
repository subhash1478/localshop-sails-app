module.exports = {
    tableName: 'promoters',
    attributes: {
        image:{ type: 'string', required: true },
        title:{ type: 'string', required: true },
        location:{ model:'Promotelocation',required: true  },
        status:{ type: 'number', required: true },
        description:{ type: 'string', required: true},
        rating:{ type: 'number',defaultsTo: 0,allowNull: true    },
        comment:{ type: 'string',allowNull: true},
     },
};
