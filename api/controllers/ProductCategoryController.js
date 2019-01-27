module.exports = {
  async addCategory(req, res) {
    var request_data = req.body;
    sails.log(request_data)
    let obj = {
      shopid: request_data.shopid,
      title: request_data.title,
    }
    await ProductCategory.count(obj)
    .then(async function (count) {
      if( count>0){
        return ResponseService.json(412, res, "data already exists")
      }
      else{
        await ProductCategory.create(obj)
        .fetch()
        .then(function (user) {
          return ResponseService.json(200, res, "added Successful", user)
        })
      }    })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },

    
    async getCategory(req, res) {
      var request_data = req.query;

      if(request_data.shopid=='undefined'){
var query={}
      }else{
        {
          var query=   { shopid: request_data.shopid}
        }
      }
      await ProductCategory.find(query).populate('shopid')
      .then(function (result) {
        if(!result || result.length<1){
          return ResponseService.json(412, res, "no data found")
        }
        return ResponseService.json(200, res, "record fetch Successful", result)
      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },
  };
  