module.exports = {
    async addlocation(req, res) {
        var request_data = req.body;
        sails.log(request_data)
        let obj = {
            location: request_data.location,
        }
        await Promotelocation.count({ location: request_data.location })
        .then(async function (count) {
            if (count > 0) {
                return ResponseService.json(412, res, "data already exists")
            }
            else {
                await Promotelocation.create(obj)
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
    // ──────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   P R O M O T E   L O C A T I O N : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //
    async getPromotelocation(req, res) {

        console.log('promotelocation');
        
        var request_data = req.query;
        await Promotelocation.find({})
      
       .then(function(response){
 
                var re = []
                async.each(response,async function (item, cb) {
                    var val={}
                    await Promoter.find({location:item.id})                
                    .then(function (data) {
                        console.log(data);
                        
                        var image
                        if(data.length>0){
                              image = `${sails.config.custom.ExpressimageUrl}/image/Promoter/${data[0].image}`

                        }else{
                            image=''
                        }
                      
      
                          val['location'] = item
                 
                        val['image'] = image
                        re.push(val)
                        cb()
                    })
                }, function () {
                    return ResponseService.json(200, res, "record fetch Successful", re)
                })            
            


 
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
    //
    // ────────────────────────────────────────────────────────────── I ──────────
    //   :::::: S U B C A T E G O R Y : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────
    //
};
