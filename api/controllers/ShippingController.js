/**
* ShippingController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/
module.exports = {
    async addShippingAddress(req,res){
        var requests_data=req.body
        var checkuser= await Shipping.count({userid:requests_data.userid});
        var updateddata={
            locality:requests_data.locality,
                city:requests_data.city,
                address:requests_data.address,
                landmark:requests_data.landmark,
                userid:requests_data.userid,
                phone:requests_data.phone,
        }
        if(checkuser>0){
            await Shipping.update({userid:requests_data.userid}).set(updateddata).then(function (result) {
                return ResponseService.json(200, res, "address update Successful", result)
            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        }else{
            var obj={
                locality:requests_data.locality,
                city:requests_data.city,
                address:requests_data.address,
                landmark:requests_data.landmark,
                userid:requests_data.userid,
                phone:requests_data.phone,
            }
            await Shipping.create(obj).fetch().then(function (result) {
                return ResponseService.json(200, res, "address save Successful", result)
            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        }
    },


 async   getShippingAddress(req,res){
        var request_data = req.query;

        await Shipping.find({
          userid: request_data.id
          })
    
           .then(function (user) {
            return ResponseService.json(200, res, "record fetch Successful", user)
          })
          .catch(function (err) {
            return ResponseService.json(500, res, err)
          });
    },

    

    async   shippingPhoneOtp(req,res){
        var request_data = req.body;

         pushServices.sms(request_data).then(function(data){
            return ResponseService.json(200, res, "record fetch Successful", data)

         })
         .catch(function (err) {
            return ResponseService.json(500, res, err)
          });
    },

    async   shippingPhoneCheckOtp(req,res){
        var request_data = req.body;

         pushServices.checksms(request_data).then(function(data){
            return ResponseService.json(200, res, "record fetch Successful", data)

         })
         .catch(function (err) {
            return ResponseService.json(500, res, err)
          });
    },

    
};
