/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //
    // ──────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: U P L O A D   P R O F I L E   I M A G E : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //
    async uploadProfileImage(req,res){
        var request_data=req.body;
        var loggedUserId=request_data.id;
        var setfilename=`${loggedUserId}${Date.now()}.jpg`
        req.file('profile_image').upload({
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
                var obj={
                    profile_image :setfilename,
                }
                await Users.update({id:loggedUserId})
                .set(obj).fetch()
                .then(function(result){
                    var image=`${sails.config.custom.imageUrl}/${setfilename}`
             
    return ResponseService.json(200, res, "Your profile updated successfully", image)
                 
                })
                .catch(function(err){
                    sails.log.debug(`Some error occured request_data.${err}`);
                    return ResponseService.json(500, res, err)
                })  
            }
        });
    },


    //
    // ────────────────────────────────────────────────────────────── I ──────────
    //   :::::: V E N D O R   J O I N : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────
    //
    async vendorJoin(req,res){
        var request_data=req.body;

await  Users.findOne({id:request_data.id})
.then(function(result){
    result.request_data=request_data
 Mailer.vendorjoin(result) 
 return ResponseService.json(200, res, "Your profile updated successfully", result)

})
.catch(function(err){
    sails.log.debug(`Some error occured request_data.${err}`);
    return ResponseService.json(500, res, err)
})  
        


    },
    
};

