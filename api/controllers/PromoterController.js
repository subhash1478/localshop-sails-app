module.exports = {
    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: A D D   P R O M O T E R : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    async addPromoter(req, res) {
        var request_data = req.body;
        sails.log(request_data)
        let obj = {
            location: request_data.location,
            title:request_data.title,
        }
        await Promoter.count({location: request_data.location,title:request_data.title})
        .then(async function (count) {
            if( count>0){
                return ResponseService.json(412, res, "data already exists")
            }
            else{
                var setfilename=`${loggedUserId}${Date.now()}.jpg`
                req.file('promoter_image').upload({
                    saveAs:setfilename,
                    dirname: require('path').resolve(sails.config.appPath, 'public/'),
                    maxBytes: 10000000
                }, async function whenDone(err, uploadedFiles) {
                    if (err) {
                        return res.serverError(err);
                    }
                    if (uploadedFiles.length === 0){
                        return res.badRequest('No file was uploaded');
                    }else{
                        obj.image=setfilename
                        await Promoter.create(obj)
                        .fetch()
                        .then(function (user) {
                            return ResponseService.json(200, res, "added Successful", user)
                        })
                    }
                });
            }    })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        //
        // ──────────────────────────────────────────────────────────── I ──────────
        //   :::::: G E T   getPromoter: :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────
        //
        async getPromoter(req, res) {
            var request_data = req.query;
            new Promise(function(resolve, reject) {
                Promoter.find({location:request_data.id})
                .then(function(data){
                    resolve (data)
                })
            }) .then(function(result) {
                return new Promise((resolve) => {    
                    var pro=[]
                    async.each(result,function(item,cb){
                        Review.find({promoterid:item.id}) 
                        .then(function(promoteriddata){
                            var val={}
                            val['promoter']=item
                            val['review']=promoteriddata
                            pro.push(val)
                            cb()
                        })
                    },function(){
                        resolve( pro)
                    })
                })
            })
            .then(function(result) {
                return new Promise((resolve) => {    
                    var jsonresult=[]
                    async.each(result,function(item,cb){
                        var val={}
sails.log('item.promoter.promoterid0',item.promoter.id)
                        Promoterimages.find({promoterid:item.promoter.id}) 
                        .then(function(image){
                            val['promoter']=item
                            val['image']=image
                            jsonresult.push(val)
                            cb()
                        })
                    },function(){
                        resolve( jsonresult)     
                    })
                })
            })
            .then(function(result) {
                return ResponseService.json(200, res, "fetch Successful", result)
            })
            .catch(function(err){
                return ResponseService.json(500, res, err)


            })
        },
        //
        // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
        //   :::::: S T A T U S   P R O M O T E R   U P D A T E : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────────────────────────────
        //
        async statusPromoter(req,res){
            var request_data=req.body;
            var loggedUserId=request_data.id;
            var setfilename=`${loggedUserId}${Date.now()}.jpg`
            var obj={
                status :request_data.status,
            }
            await Promoter.update({id:loggedUserId})
            .set(obj).fetch()
            .then(function(result){
                var image=`${sails.config.custom.imageUrl}/${setfilename}`
                return ResponseService.json(200, res, "Your status updated successfully", image)
            })
            .catch(function(err){
                sails.log.debug(`Some error occured request_data.${err}`);
                return ResponseService.json(500, res, err)
            })  
        },
    };
    