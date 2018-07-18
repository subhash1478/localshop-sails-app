

module.exports = {
  async login(req,res){
       var request_data=req.body;
       if(!request_data.email || !request_data.password){
           return ResponseService.json(400 , res, "please enter email and password")
       }
       sails.log(Users);

       await Admin.findOne({email:request_data.email,password:request_data.password})
       .then(function (user){

           console.log(user);

           if(!user) {
               return ResponseService.json(400  , res, "Invalid email or password")
           }
    c

           var responseData = {
               user: user,
               token: JwtService.issue({email:user.email,id:user._id})
           }
           return ResponseService.json(200, res, "Login Successful", responseData)
       })
       .catch(function(err){
           return ResponseService.json(500, res, err)
       });
   },

};
