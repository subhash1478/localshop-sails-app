module.exports = {
    async createPush(req, res) {
        var request_data = req.body;
        let obj = {
            pushmessage:  request_data.pushmessage,
            receiverid:  request_data.receiverid,
            message_type: request_data.message_type,
            status:  1
        }
        await PushNotification.create(obj)
        .fetch()
        .then(function (user) {
            return ResponseService.json(200, res, "Push Notification Successful", user)
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
    //
    // ────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   P U S H   N O T I F I C A T I O N : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────────
    //
    async getPushNotification(req, res) {
        var request_data = req.query;
        console.log('request_data');
 
        await PushNotification.find({
            receiverid: request_data.id,status:1
        }) 
        .then(function (user) {
            return ResponseService.json(200, res, "record fetch Successful", user)
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
 async   markReadNotification(req,res){
        var request_data = req.body;
        var obj={
            status:0
        }
        await PushNotification.update({id:request_data.id})
        .set(obj).fetch()
        .then(function(result){
            return ResponseService.json(200, res, "Notification updated successfully", result)
        })
        .catch(function(err){
            sails.log.debug(`Some error occured request_data.${err}`);
            return ResponseService.json(500, res, err)
        })  
    },

    
};
