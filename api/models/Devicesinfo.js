module.exports = {
  tableName: 'devicesinfos',

  attributes: {
    devicesid: {type: 'string',required: true},
    userid: {model:'Users'},
    driverid: {model:'Driver'},
    user_type: {type: 'string',required: true},
   socketid:{type: 'string'}
  },
};
