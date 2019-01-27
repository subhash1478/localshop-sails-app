module.exports = {
  tableName: 'promotelocation',
  attributes: {
    location: { type: 'string', required: true },
    subcategory: { type: 'json', columnType: 'array' },
  
 },
};
