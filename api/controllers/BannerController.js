module.exports = {
    async addBanner(req, res) {
        var request_data = req.query;
        console.log('tag', request_data)
        var setfilename=`${Date.now()}.jpg`
        req.file('banner_image').upload({
            saveAs:setfilename,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/banner/'),
            maxBytes: 10000000
        }, async function whenDone(err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded');
            }else{
                let obj = {
                    image: setfilename,
                    bannerindex: request_data.id,
                }
                await Banner.create(obj)           
                .then(function(result){
                    var image=`${sails.config.custom.imageUrl}/${setfilename}`;
                    return ResponseService.json(200, res, "Banner added successfully", result)
                })
                .catch(function(err){
                    sails.log.debug(`Some error occured request_data.${err}`);
                    return ResponseService.json(500, res, err)
                })  
            }
        });
    },
    async getBanner(req, res) {
        var request_data = req.query;
        await Banner.find({}).populate('linkto')
        .then(function (result) {
            return   new Promise((resolve)=>{
                var bannerdata=[]
                async.each(result,function(item,cb){
                    console.log('tag', item)
                    var val={}
                    var image=`${sails.config.custom.imageUrl}/images/banner/${item.image}`;
                    val['image']=image
                    val['id']=item.id
                    val['bannerindex']=item.bannerindex
                    val['linkto']=item.linkto
                    bannerdata.push(val)
                    cb()
                },function(){
                    resolve( bannerdata)
                })
            })
        })
        .then(function(data){
            return ResponseService.json(200, res, "Banner added successfully", data)
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
    async deleteBanner(req, res) {
        var request_data = req.body;
        await Banner.destroy({id:request_data.id}) 
        .then(function (result) {
            return ResponseService.json(200, res, "removed Banner Item", result)
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },


    async linkbanner(req, res) {
        var request_data = req.body;
        await Banner.update({id:request_data.id}).set({
            linkto:request_data.linkto
        }).fetch()
        .then(function (result) {
            return ResponseService.json(200, res, "removed Banner Item", result)
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
};
