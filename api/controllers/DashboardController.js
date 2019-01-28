/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async getAllCountFrom(req,res){
      let obj={
        users:await Users.count({}),
        categories:await Category.count({}),
        driver:await Driver.count({}),
        totalOrder:await Order.count({}),
        sales:await Order.sum('totalprice').where({status:1}),
        completedOrder:await Order.count({status:1}),
        product:await Product.count({}),
        pushnotification:await PushNotification.count({}),
        reviews:await Review.count({}),
        post:await Post.count({})
    }
      return ResponseService.json(200, res, "record fetched", obj)

  }

};

