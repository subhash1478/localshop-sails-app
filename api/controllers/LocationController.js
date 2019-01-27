module.exports = {
    //
    // ──────────────────────────────────────────────────────────── I ──────────
    //   :::::: A D D   D R I V E R : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────
    //
    async addLocation(req, res) {
        var request_data = req.body;
        sails.log(request_data)
        var obj = {
            title: request_data.title,
 

        }
        await Location.count(obj)
        .then(async function (count) {
            if( count>0){
                return ResponseService.json(200, res, "data already exists")
            }
            else{
                await Location.create(obj)
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
        async getLocation(req, res) {
            var request_data = req.query;
            await Location.find({}) 
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
    