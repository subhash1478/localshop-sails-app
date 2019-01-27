module.exports.vendorjoin = function(obj) {
    sails.log(obj)



    sails.hooks.email.send(
            "vendorjoin",
            {
                Name: `${obj.firstname} ${obj.lastname}`,
                email:  obj.email,
                shop:  obj.request_data.shopname,
                phone:obj.request_data.phone,
                address: obj.request_data.address,
                about: obj.request_data.about
            },
 

            {
                to: 'souviktripathy@gmail.com',
                subject: "Vendor join request"
    
            },
            function(err) {console.log(err || "It worked!");}

        )

        


};