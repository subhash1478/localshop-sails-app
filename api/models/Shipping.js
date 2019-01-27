 
module.exports = {

  attributes: {
    locality:{type:'string',required:true},
    city:{type:'string',required:true},
    address:{type:'string',required:true},
    landmark:{type:'string',required:true},
    phone:{type:'string',required:true},
    userid:{model:'Users'}
  },

};

