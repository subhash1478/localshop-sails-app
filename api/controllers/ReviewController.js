module.exports = {    
    async getReview(req, res) {
        var request_data = req.query;
      

        if(request_data.type=='promoter'){
      
            var obj={
                promoterid: request_data.id,
                type:request_data.type,
                userid:request_data.userid
              }
            
        }else{
            var obj={
                postid: request_data.id,
                type:request_data.type,
                userid:request_data.userid
              }
            
        }




        await Review.findOne(obj)

        .then(function (result) {

            console.log('tag', result)
            if(result===undefined){
                return ResponseService.json(200, res, false, result)
            }else{
                return ResponseService.json(200, res, true, result)

            }        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
    async updateReview(req, res) {
        var request_data = req.body;
        if(request_data.type=='promoter'){
            var obj={
                comment: request_data.comment,
                rating: request_data.rating,
                userid: request_data.userid,
                type:request_data.type,
                promoterid:request_data.id,
                status:request_data.status
            }
        }else{
            var obj={
                comment: request_data.comment,
                rating: request_data.rating,
                userid: request_data.userid,
                type:request_data.type,
                postid:request_data.id,
                status:request_data.status
            }
        }
        await Review.update({
            id: request_data.reviewid,
        }) 
        .set(obj)
        .then(function (result) {

            
            return ResponseService.json(200, res, "record fetch Successful", result)
        })
        .catch(function (err) {
            return ResponseService.json(500, res, err)
        });
    },
};
