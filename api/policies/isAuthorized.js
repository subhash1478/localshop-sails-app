module.exports = function (req, res, next) {  
  let token;
  
  if (req.headers && req.headers['x-access-token'] ){
    token=req.headers['x-access-token'] 
  } else {
    return ResponseService.json(401, res, "No authorization header was found");
  }
 
  JwtService.verify(token, function(err, decoded){
    if (err) return ResponseService.json(401, res, "Invalid Token!");
    req.token = token;
     EmployeeMaster.findOne({id: decoded.employee_id})

    .then(function(user){


      
      req.current_user = user;
      next();
    })
  });

}