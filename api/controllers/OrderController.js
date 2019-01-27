module.exports = {
  //
  // ──────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: C R E A T E   O R D E R I D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────
  //
  async createOrder(req, res) {
    var orderid = require('order-id')('mysecret');
    var id = orderid.generate();
    var request_data = req.body;
    var dataobj = {
      userid:request_data.userid ,
      shopid:request_data.shopid ,
      orderid:id,
      totalprice: request_data.totalprice ,
      discount: request_data.discount ,
      delivered: request_data.delivered ,
      deliveredfee: request_data.deliveredfee ,
      sgst:request_data.sgst ,
      cgst: request_data.cgst ,
      containercharges: request_data.containercharges ,
      driver_accept:0,
      driver_picked:0,
      user_received:0,
      shop_accept:0,
      shop_prepared:0,
      status: 0,
      payment_type:request_data.payment_type ,
      transactionid:request_data.transactionid ,
      payment_recived: request_data.payment_recived
    } 
    await Order.create(dataobj).fetch().then(function(user){
      async.each(request_data.orderitem,  async function(item,cb){
        sails.log(item)
        await OrderItem.update({id:item}).set({
          orderid:user.id
        }).then(function(result){
          cb()
        })
      },function(){
        let obj = {
          pushmessage:  `A new order is placed ${id} of  ₹ ${request_data.totalprice} please confirm the order from dashboard`,
          shopid:  request_data.shopid,
          message_type:'orderplaced',
          status:  1
        }
        pushServices.NewOrderPush(obj)
let sms={
  orderid:id,
  totalprice:request_data.totalprice ,
  userid:request_data.userid 
}

        pushServices.OrderPlacedSms(sms)
        return ResponseService.json(200, res, "added Successful", user)
      })
    })
    .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  }, 
  //
  // ────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T     U S E R   O R D E R : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────
  //
  async getOrder(req,res){
    var request_data = req.query;
    await Order.find({id:request_data.id})
    .populate('shopid')
    .populate('driverid')
    .populate('userid')
    .then(function(result){      
      var orderitemarr=[];
      async.each(result,async function(item,cb){
        await OrderItem.find({orderid:item.id})
        .populate('productid')
        .populate('shopid')
        .populate('userid')
        .then(function (cart) {
          sails.log(cart)
          var newvar={}
          newvar['cart']=cart
          newvar['order']=item        
          orderitemarr.push(newvar)
          cb();
        })        
      },function(){
        return ResponseService.json(200, res, "cart", orderitemarr)
      })      
    })
    .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  },
  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: I N S T A M O J O   P A Y M E N T   T O K E N   G E N E R A T E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  async payment(req, res) {
    var request= require('request');
    var request_data = req.body;
    var headers = { 'X-Api-Key': 'test_078019929f2199e9826af55a501', 'X-Auth-Token': 'test_8383e8734b1e15617304ade020d'}
    var payload = {
      purpose: request_data.purpose,
      amount: request_data.amount,
      phone: request_data.phone,
      buyer_name: request_data.buyer_name,
      redirect_url: 'http://www.example.com/redirect/',
      send_email: true,
      webhook: 'http://www.example.com/webhook/',
      send_sms: true,
      email:request_data.buyer_email,
      allow_repeated_payments: false
    }
    request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
    if(!error && response.statusCode == 201){
      //console.log(body);
      return ResponseService.json(200, res, "Successful", JSON.parse(body))
    }
  })
},
//
// ────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   P A Y M E N T   D E T A I L S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//
async getPaymentDetails(req,res){
  var request= require('request');
  var headers = { 'X-Api-Key': 'test_078019929f2199e9826af55a501', 'X-Auth-Token': 'test_8383e8734b1e15617304ade020d'}
  request.get(
    'https://test.instamojo.com/api/1.1/payments/MOJO5a06005J21512197/',
    {form: payload,  headers: headers}, function(error, response, body){
      if(!error && response.statusCode == 200)
      {
        //console.log(body);
      }
    })
  },
  //
  // ──────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T   O R D E R   L I S T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────
  //
  async getOrderList(req,res){
    var request_data = req.query;
    await Order.find({userid:request_data.id})    
    .populate('shopid').sort('createdAt DESC')
    .then(function(result){
      return ResponseService.json(200, res, "cart", result)
      //   var orderitemarr=[];
      //   async.each(result,async function(item,cb){
      //     await OrderItem.find({orderid:item.id})
      //     .populate('shopid')
      //    .then(function (cart) {
      //     sails.log(cart)
      //     var newvar={}
      //     newvar['cart']=cart
      //     newvar['order']=item        
      //     orderitemarr.push(newvar)
      //     cb();
      //   })        
      //   },function(){
      //     return ResponseService.json(200, res, "cart", orderitemarr)
      //  })      
    })
    .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  },
  //
  // ────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T    shop   O R D E R : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────
  //
  async getShopOrder(req,res){
    var request_data = req.query;
    await Order.find({shopid:request_data.id})    
    .then(function(result){      
      var orderitemarr=[];
      async.each(result,async function(item,cb){
        await OrderItem.find({orderid:item.id})
        .populate('productid')
        .populate('shopid')
        .then(function (cart) {
          sails.log(cart)
          var newvar={}
          newvar['cart']=cart
          newvar['order']=item        
          orderitemarr.push(newvar)
          cb();
        })        
      },function(){
        return ResponseService.json(200, res, "cart", orderitemarr)
      })      
    })
    .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  },
  //
  // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: A S S I G N   D R I V E R   T O   O R D E R : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────
  //
  async assignDriverToOrder(req,res){
    var request_data = req.body;
    await Order.update({id:request_data.id})
    .set({driverid:request_data.driverid})
    .fetch()
    .then(function (user) {
      pushServices.assignDriverPush(request_data);
      return ResponseService.json(200, res, "driver assign to order", user)
    }) .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  },
  //
  // ────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: G E T   N E W   O R D E R : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────
  //
  async getnewOrder(req,res){
    var request_data = req.query;
    var cond;
    if(request_data.type==='driver'){
      cond={driverid:request_data.id,status:request_data.status}
    }
    if(request_data.type==='partner'){
      var arr=request_data.id.split(",")
      cond={shopid:arr,shop_accept:request_data.status}
    }
    if(request_data.type==='user'){
      cond={userid:request_data.id,status:request_data.status}
    }
    sails.log(cond)
    await Order.find(cond).sort('createdAt ASC')
    .populate('shopid')
    .populate('driverid')
    .populate('userid')
    .then(function(result){   
      if(result.length<1){
        return ResponseService.json(401, res, "no new task", result)
      }else{
        var orderitemarr=[];
        async.each(result,async function(item,cb){
          await OrderItem.find({orderid:item.id})
          .populate('productid')
          .populate('shopid')
          .populate('userid')
          .then(function (cart) {
            sails.log(cart)
            var newvar={}
            newvar['cart']=cart
            newvar['order']=item        
            orderitemarr.push(newvar)
            cb();
          })        
        },function(){
          return ResponseService.json(200, res, "cart", orderitemarr)
        })   
      }
    })
    .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  },
  //
  // ────────────────────────────────────────────────────────────── I ──────────
  //   :::::: R E J E C T   T A S K : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────
  //
  async  rejectTask(req,res){
    var request_data = req.body;
    sails.log(request_data)
    var cond,msg;
    if(request_data.type=='driver_reject'){
      cond={
        driver_picked:2,
        comment:request_data.comment
      }
      msg='Order Reject by driver'
    }
    if(request_data.type=='shop_reject'){
      cond={
        shop_accept:2,
        comment:request_data.comment
      }
      msg='Order Reject by shop'
    }
    await Order.update({id:request_data.id}).set(cond).fetch()
    .then(function(result){ 
      pushServices.taskUpdatePush(request_data.id,msg);
      return ResponseService.json(200, res, "updated", result);
    })
    .catch(function (err) {
      return ResponseService.json(500, res, err)
    });
  },
};
