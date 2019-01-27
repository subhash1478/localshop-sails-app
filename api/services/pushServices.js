module.exports = {
  //
  // ──────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: T A S K   U P D A T E   P U S H : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  taskUpdatePush:function(data,msg){
    Order.findOne({id:data}).then(function(result){
       var devicestoken=[]
       Devicesinfo.find({userid:result.userid}) 
      .then(function (result) {
        async.each(result,function(item,cb){
          devicestoken.push(item.devicesid)
          cb()
        },function(){
          var admin_message = { 
            app_id:sails.config.custom.onesignal_admin_id ,
            key:sails.config.custom.onesignal_admin_key,
            contents: {"en": msg},
            headings: {"en":"Order update"},
            included_segments: ["All"],
          };
          var user_message = { 
            app_id:sails.config.custom.onesignal_user_id ,
            key:sails.config.custom.onesignal_user_key,
            contents: {"en": msg},
            headings: {"en":"Order update"},
            include_player_ids: devicestoken,
            small_icon:'http://139.59.12.86:3001/icon.png',
            large_icon:'http://139.59.12.86:3001/cook.png',
            android_sound:'sound.mp3',
            android_led_color:'FF0000',
            userid:result[0].userid,
            type:'user'
          };
          pushServices.pushFire(admin_message);
          pushServices.pushFire(user_message);
          pushServices.savePush(user_message)

          let sms={
            id:data,
             userid:result[0].userid ,
             msg:msg
          }
          pushServices.OrderUpdateSms(sms)
        })
      })
    })
  },
//
// ──────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A S S I G N   D R I V E R   T A S K : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────
//
  assignDriverPush:function(data){
    sails.log(data.driverid)
    Devicesinfo.find({driverid:data.driverid}) 
    .then(function (result) {
      sails.log('assignDriverPush')
      var driver_message = { 
        app_id:sails.config.custom.onesignal_driver_id ,
        key:sails.config.custom.onesignal_driver_key,
        contents: {"en": 'New task assign'},
        headings: {"en":"New task assign"},
        include_player_ids: [result[0].devicesid],
        small_icon:'http://139.59.12.86:3001/icon.png',
        large_icon:'http://139.59.12.86:3001/cook.png',
        android_sound:'sound.mp3',
        android_led_color:'FF0000',
        userid:data.driverid,
        type:'driver'
      };
      sails.log(result)
      pushServices.pushFire(driver_message);
      pushServices.savePush(driver_message)
    })
  },
  NewOrderPush: function (data) {
    Post.findOne({id:data.shopid}).then(function(result){
      var devicestoken=[]
      sails.log(result.userid)
      Devicesinfo.find({userid:result.userid}) 
      .then(function (result) {
        async.each(result,function(item,cb){
          devicestoken.push(item.devicesid)
          cb()
        },function(){
          var admin_message = { 
            app_id:sails.config.custom.onesignal_admin_id ,
            key:sails.config.custom.onesignal_admin_key,
            contents: {"en": data.pushmessage},
            headings: {"en":"New order placed"},
            included_segments: ["All"],
          };
          var patner_message = { 
            app_id:sails.config.custom.onesignal_partner_id ,
            key:sails.config.custom.onesignal_partner_key,
            contents: {"en": data.pushmessage},
            headings: {"en":"New order placed"},
            include_player_ids: devicestoken,
            small_icon:'http://139.59.12.86:3001/icon.png',
            large_icon:'http://139.59.12.86:3001/cook.png',
            android_sound:'sound.mp3',
            android_led_color:'FF0000',
            userid:result[0].userid,
            type:'partner'
          };
          pushServices.pushFire(admin_message);
          pushServices.pushFire(patner_message);
          pushServices.savePush(patner_message)
        })
      })
    })
  },
  pushFire:function(data){
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${data.key}`
    };
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
      });
    });
    req.on('error', function(e) {
    });
    req.write(JSON.stringify(data));
    req.end();
  },
  savePush(data){
    let obj = {
      pushmessage: `${data.headings.en} ${data.contents.en}`,
      receiverid:  data.userid,
      message_type: data.type,
      status:  1
  }
  sails.log('user')
  sails.log(data)
    PushNotification.create(obj)
  .fetch()
  .then(function (user) {
    sails.log('user')
    sails.log(user)
  })
  .catch(function (err) {
  });
  },
  //
  // ────────────────────────────────────────────────────── I ──────────
  //   :::::: S M S   S E N T: :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  //
  otpsms:function(data){
    var otp = Math.floor(1000 + Math.random() * 9000);
    var http = require("http");
   var  msg ='OTP '
    var options = {
      "method": "POST",
      "hostname": "control.msg91.com",
      "port": null,
      "path": `/api/sendotp.php?template=&otp_length=4&authkey=238485AZOJLhImbZ5ba24551&message=OTP-${otp}&sender=SSMBOT&mobile=${data.phone}&otp=${otp}`,
      "headers": {}
    };
  return  new Promise(function(resolve, reject) {
      var req = http.request(options, function (res) 
      {
        var chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          resolve( body.toString());
        });
      });
      req.end();
    })
  },
  //
  // ──────────────────────────────────────────────────────── I ──────────
  //   :::::: C H E C K S M S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  //
  checksms:function(data){
    var qs = require("querystring");
    var http = require("https");
    var options = {
      "method": "POST",
      "hostname": "control.msg91.com",
      "port": null,
      "path": `/api/verifyRequestOTP.php?authkey=238485AZOJLhImbZ5ba24551&mobile=${data.phone}&otp=${data.otp}`,
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    };
    return  new Promise(function(resolve, reject) {
    var req = http.request(options, function (res) {
      var chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve( body.toString());
      });
    });
    req.write(qs.stringify({}));
    req.end();
  })
  },
  //
  // ────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: T R A N S A C T I O N A L   M E S S A G E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────
  //
  OrderPlacedSms:function(data){
    Order.findOne({orderid:data.orderid})    .populate('shopid')
    .then(function(order){
      sails.log(order)
      Shipping.findOne({userid:data.userid}) 
     .then(function (result) {
      let obj={
        phone:result.phone,
        msg:  `Your baharampur one touch order id ${data.orderid} of  Rs${order.totalprice} is placed successful `,
        type:'order_placed'
      }
      pushServices.sendTransactionalSms(obj)
     })
   })
  },
  OrderUpdateSms:function(item){

    
    Order.findOne({id:item.id})    .populate('shopid')
    .then(function(order){
      sails.log(order)
      Shipping.findOne({userid:item.userid}) 
     .then(function (result) {
      let obj={
        phone:result.phone,
        msg:    item.msg,

      }
      pushServices.sendTransactionalSms(obj)
     })
   })

  },



sendTransactionalSms(data){
   var http = require("http");
   var msg=`/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=91${data.phone}&authkey=238485AZOJLhImbZ5ba24551&message=${data.msg}`
   var options = {
    "method": "POST",
    "hostname": "control.msg91.com",
    "port": null,
    "path":  encodeURI(msg),
    "headers": {}
  };
return  new Promise(function(resolve, reject) {
    var req = http.request(options, function (res) 
    {
      var chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve( body.toString());
      });
    });
    req.end();
  })
}
};
