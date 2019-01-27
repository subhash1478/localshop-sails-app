 
 module.exports = {
    //
    // ──────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: U P L O A D   P R O F I L E   I M A G E : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //
    async uploadPromoterImage(req,res){
        var request_data=req.query;
        
        console.log(request_data);
        
        var setfilename=`${Date.now()}.jpg`
        req.file('promoter_image').upload({
            saveAs:setfilename,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/Promoter/'),
            maxBytes: 10000000
        }, async function whenDone(err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded');
            }else{
                var obj={
                    images :setfilename,
                    promoterid:request_data.id
                }
                await Promoterimages.create(obj)
                .then(function(result){
                    return ResponseService.json(200, res, "Your profile updated successfully", result)
                })
                .catch(function(err){
                    sails.log.debug(`Some error occured request_data.${err}`);
                    return ResponseService.json(500, res, err)
                })  
            }
        });
    },
    
    //
    // ──────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   P R O M O T E R   I M A G E : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────
    //

    

    
    async getPromoterImage(req, res) {
        var request_data = req.query;
        Promoterimages.find({promoterid:request_data.id}) 
        .then(function(promoteriddata){
            var resdata=[]
            async.each(promoteriddata,function(ite,cb){
                var val={}
                val['image']=`${sails.config.custom.imageUrl}/images/Promoter/${ite.images}`
                val['id']=ite.id
                 resdata.push(val)
                
                cb()
            },function(){
                return ResponseService.json(200, res, " successfully", resdata)


            })
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },


    

        
    async deletePromoterImage(req, res) {
        var request_data = req.body;
        Promoterimages.destroy({id:request_data.id}).fetch()
        .then(function(promoteriddata){
            return ResponseService.json(200, res, " successfully", promoteriddata)

        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
};
