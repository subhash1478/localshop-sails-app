module.exports = {
    //
    // ──────────────────────────────────────────────────────────── I ──────────
    //   :::::: A D D   D R I V E R : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────
    //
    async addDevicesDetails(req, res) {
        var request_data = req.body;
        sails.log(request_data)
        if(request_data.user_type=='driver'){
            var obj = {
                devicesid: request_data.devicesid,
                driverid: request_data.userid,
                user_type:request_data.user_type,
                socketid:request_data.socketid
            }
        }else{
            var obj = {
                devicesid: request_data.devicesid,
                userid: request_data.userid,
                user_type:request_data.user_type,
                socketid:request_data.socketid

            }


        }
        console.log('====================================')
        console.log(obj)
        console.log('====================================') 
        await Devicesinfo.count(obj)
        .then(async function (count) {
            if( count>0){
                return ResponseService.json(200, res, "data already exists")
            }
            else{
                await Devicesinfo.create(obj)
                .fetch()
                .then(function (user) {
                    return ResponseService.json(200, res, "added Successful", user)
                })
            }   
         })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        //
        // ──────────────────────────────────────────────────────────── I ──────────
        //   :::::: G E T   D R I V E R : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────
        //
        async Devicesinfo(req, res) {
            var request_data = req.query;
            await Driver.find({}) 
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
        //
        // ────────────────────────────────────────────────── I ──────────
        //   :::::: L O G I N : :  :   :    :     :        :          :
        // ────────────────────────────────────────────────────────────
        //
        async DevicesinfoByUserId(req, res) {
            var request_data = req.body;
            sails.log(request_data);
            await Devicesinfo.find({user_type:'customer'}) 
            .then(function (result) {
    var devicestoken=[]
                async.each(result,function(item,cb){
                    devicestoken.push(item.devicesid)

cb()

                },function(){
                    return ResponseService.json(200, res, "record fetch Successful", devicestoken)

                })

            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        
        
       
    };
    