module.exports = {
 
  attributes: {
    driver_first_name: {type: 'string',required: true},
    driver_last_name: {type: 'string',required: true},
    driver_email: {type: 'string',required: true},
    driver_password: {type: 'string',required: true},
    driver_phone: {type: 'string',},
   driver_address: {type: 'string',}, 
   driver_location:  { type: 'json', columnType: 'array' },
 
  },
};
