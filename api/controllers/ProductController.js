module.exports = {
  async addProduct(req, res) {
    var request_data = req.body;
    let obj = {
      product_category:request_data.category,
      title: request_data.title,
      price: request_data.price,
      status: request_data.status,
      offerprice: request_data.offerprice,
      discount:request_data.discount,
    }
    await Product.count({
      product_category: request_data.category,
      title: request_data.title
    })
    .then(async function (count) {
      if( count>0){
        return ResponseService.json(412, res, "data already exists")
      }
      else{
        await Product.create(obj)
        .fetch()
        .then(function (user) {
          return ResponseService.json(200, res, "added Successful", user)
        })
      }    })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
  },
  async getProduct(req, res) {
    var request_data = req.query;

    await Product.find({
      product_category: request_data.id
      })
      .fetch()
      .then(function (user) {
        return ResponseService.json(200, res, "record fetch Successful", user)
      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
  },
};
