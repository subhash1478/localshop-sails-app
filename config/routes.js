

module.exports.routes = {


  '/': {
    view: 'pages/homepage'
  },
  'POST /api/login': 'AdminController.login',
  'POST /api/add-product-category': 'ProductCategoryController.addCategory',
  'GET /api/get-product-category': 'ProductCategoryController.getCategory',

  'POST /api/add-product': 'ProductController.addProduct',
  'GET /api/get-product': 'ProductController.addProduct',

};
