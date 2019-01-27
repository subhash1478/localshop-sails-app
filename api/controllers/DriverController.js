module.exports = {
    async addDriver(req, res) {
        var request_data = req.body;
        sails.log(request_data)
        let obj = {
            driver_first_name: request_data.driver_first_name,
            driver_last_name: request_data.driver_last_name,
            driver_email: request_data.driver_email,
            driver_password: request_data.driver_password,
            driver_phone: request_data.driver_phone,
            driver_address: request_data.driver_address,
            driver_location:  request_data.driver_location
        }
        await Driver.count({driver_email: request_data.driver_email})
        .then(async function (count) {
            if( count>0){
                return ResponseService.json(412, res, "data already exists")
            }
            else{
                await Driver.create(obj)
                .fetch()
                .then(function (user) {
                    return ResponseService.json(200, res, "added Successful", user)
                })
            }    })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        //
        // ──────────────────────────────────────────────────────────── I ──────────
        //   :::::: G E T   D R I V E R : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────
        //
        async getDriver(req, res) {
            var request_data = req.query;
            await Driver.find({}) 
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
        //
        // ────────────────────────────────────────────────── I ──────────
        //   :::::: L O G I N : :  :   :    :     :        :          :
        // ────────────────────────────────────────────────────────────
        //
        async driverLogin(req, res) {
            var request_data = req.body;
            sails.log(request_data);
            await Driver.findOne({
                driver_email:request_data.email,
                driver_password:request_data.password
            }) 
            .then(function (result) {
                if(result.length<1){
                    return ResponseService.json(412, res, "invalid Login")
                }
                return ResponseService.json(200, res, "login  Successful", result)
            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        //
        // ──────────────────────────────────────────────────────────────────────── I ──────────
        //   :::::: G E T   D R I V E R   O R D E R : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────────────────
        //
        async getDriverOrder(req,res){
            var request_data = req.query;
            await Order.find({driverid:request_data.id,status:0}).limit(1).sort('createdAt ASC')
            .populate('shopid')
            .populate('driverid')
            .populate('userid')
            .then(function(result){   
                if(result.length<1){
                    return ResponseService.json(401, res, "no new task", result)
                }else{
                    var orderitemarr=[];
                    async.each(result,async function(item,cb){
                        await OrderItem.find({orderid:item.id})
                        .populate('productid')
                        .populate('shopid')
                        .populate('userid')
                        .then(function (cart) {
                            sails.log(cart)
                            var newvar={}
                            newvar['cart']=cart
                            newvar['order']=item        
                            orderitemarr.push(newvar)
                            cb();
                        })        
                    },function(){
                        return ResponseService.json(200, res, "cart", orderitemarr)
                    })   
                }
            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        //
        // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
        //   :::::: D R I V E R   L I S T   O R D E R : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────────────────────────────
        //
        async getDriverOrderList(req,res){
            var request_data = req.query;
            await Order.find({driverid:request_data.id}).sort('createdAt DESC')
            .populate('shopid')
            .populate('driverid')
            .populate('userid')
            .then(function(result){      
                var orderitemarr=[];
                async.each(result,async function(item,cb){
                    await OrderItem.find({orderid:item.id})
                    .populate('productid')
                    .populate('shopid')
                    .populate('userid')
                    .then(function (cart) {
                        sails.log(cart)
                        var newvar={}
                        newvar['cart']=cart
                        newvar['order']=item        
                        orderitemarr.push(newvar)
                        cb();
                    })        
                },function(){
                    return ResponseService.json(200, res, "cart", orderitemarr)
                })      
            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
        //
        // ──────────────────────────────────────────────────────────── I ──────────
        //   :::::: D R I V E R  T A S K : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────
        //
        async  Task(req,res){
            var request_data = req.body;
            sails.log(request_data)
            var cond,msg;
            if(request_data.type=='driver_picked'){
                cond={
                    driver_picked:request_data.value
                }
                msg='Order picked by driver'
            }
            if(request_data.type=='driver_accept'){
                cond={
                    driver_accept:request_data.value
                }
                msg='Order accepted by driver'

            }
            if(request_data.type=='user_received'){
                cond={
                    user_received:request_data.value,status:1
                }
                msg='Order recived by user'

            }
            if(request_data.type=='shop_accept'){
                cond={
                    shop_accept:request_data.value
                }
                msg='Order accepted by shop'

            }
            if(request_data.type=='shop_prepared'){
                cond={
                    shop_prepared:request_data.value
                }
                msg='Order is preparing'

            }
            if(request_data.type=='payment_recived'){
                cond={
                    payment_recived:request_data.value
                }
                msg='Order payment recieved '

            }
            await Order.update({id:request_data.id}).set(cond).fetch()
            .then(function(result){ 




                pushServices.taskUpdatePush(request_data.id,msg);



                return ResponseService.json(200, res, "updated", result);
            })
            .catch(function (err) {
                return ResponseService.json(500, res, err)
            });
        },
    };
