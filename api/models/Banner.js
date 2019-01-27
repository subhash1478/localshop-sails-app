 
module.exports = {
  tableName: 'banner',

  attributes: {

     image:{ type: 'string', required: true },
    bannerindex:{ type: 'number', required: true },
    linkto:{ model:'Post'},
    
  },
  

};

