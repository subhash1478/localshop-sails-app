/**
* OrderItemController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/
module.exports = {
  async addToCart(req, res) {
    var request_data = req.body;
    sails.log(request_data)
    let obj = {
      productid: request_data.productid,
      price: request_data.price,
      quantity: request_data.quantity,
      userid: request_data.userid,
      shopid: request_data.shopid,
      status:0
    }
    let cond = {
      productid: request_data.productid,
      userid: request_data.userid,
      shopid: request_data.shopid,
      status:0,
      orderid:''
    }
    await OrderItem.count(cond)
    .then(async function (count) {
      if( count>0){
        await OrderItem.update(cond)
        .set({quantity:request_data.quantity}).fetch()
        .then(function (user) {
          return ResponseService.json(200, res, "added to cart", user)
        })
      }
      else{
        await OrderItem.create(obj)
        .fetch()
        .then(function (user) {
          return ResponseService.json(200, res, "added to cart", user)
        })
      }    })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },
    
    
    async  getCart(req,res){
      
      var request_data = req.query;
      
      await OrderItem.find({userid:request_data.id,orderid:''}) 
      .populate('shopid')
      .populate('productid')
      
 
       

      .then(function (cart) {

        if( cart.length<1){
          return ResponseService.json(412, res, "cart empty")
      }
        return ResponseService.json(200, res, "cart", cart)
      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },
    //
    // ──────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: R E M O V E   C A R T   I T E M : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //
 
      async  removeCartItem(req,res){
      
        var request_data = req.body;
        
        await OrderItem.destroy({id:request_data.id}) 
 
   
         
  
        .then(function (cart) {
  
 
          return ResponseService.json(200, res, "remove Cart Item", cart)
        })
        .catch(function (err) {
          return ResponseService.json(500, res, err)
        });
      },

      async  replaceCart(req,res){
      
        var request_data = req.body;
        
        await OrderItem.destroy({userid:request_data.userid,shopid:request_data.shopid[0],status:0,orderid:''}) 
 
   
         
  
        .then(function (cart) {
  
 
          return ResponseService.json(200, res, "remove Cart Item", cart)
        })
        .catch(function (err) {
          return ResponseService.json(500, res, err)
        });
      }
      
    }
  