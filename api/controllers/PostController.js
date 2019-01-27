module.exports = {
  async getUserShop(req, res) {
    var request_data = req.query;
    console.log(request_data)
    await Post.find({ userid: request_data.id, region: request_data.region })
      .then(function (result) {
        if (!result || result.length < 1) {
          return ResponseService.json(412, res, "no data found")
        }
        return ResponseService.json(200, res, "record fetch Successful", result)
      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
  },
};

