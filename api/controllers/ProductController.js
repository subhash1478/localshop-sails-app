module.exports = {
  async addProduct(req, res) {
    var request_data = req.body;
    let obj = {
      product_category:request_data.category,
      title: request_data.title,
      price: request_data.price,
      status: request_data.status,
      offerprice: request_data.offerprice,
      discount:request_data.discount,
    }
    await Product.count({
      product_category: request_data.category,
      title: request_data.title
    })
    .then(async function (count) {
      if( count>0){
        return ResponseService.json(412, res, "data already exists")
      }
      else{
        await Product.create(obj)
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
    // ────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   P R O D U C T : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────
    //
    async getProduct(req, res) {
      var request_data = req.query;
      await Product.find({
        product_category: request_data.id
      }).populate('product_category')
      .then(function (user) {
var product=[]
        user.forEach(element => {
          const object=Object.assign({})

          object.discount=element.discount
          object.id =element.id

          object.image =(element.image!="")?`${sails.config.custom.imageUrl}/images/product/${element.image}`:''
                      

          object.offerprice =element.offerprice
          object.price =element.price
          object.product_category =element.product_category
          object.status =element.status
          object.title =element.title
          object.updatedAt =element.updatedAt;
          object.active =element.active;

          product.push(object)
console.log(object)
        });


        return ResponseService.json(200, res, "record fetch Successful", product)
      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },
    //
    // ─── GET USER PRODUCT ────────────────────────────────────────────
    //
    async getUserProduct(req, res) {
      var request_data = req.query;
      await ProductCategory.find({
        shopid: request_data.id
      }) 
      .then(function (user) {
        return ResponseService.json(200, res, "record fetch Successful", user)
      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },
    //
    // ────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: G E T   R E S T U R A N T   P R O D U C T : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────────
    //
    async getResturantProduct(req,res){
      var request_data = req.query;
      await Product.find({
      }).populate('product_category')
      .then(function (product) {

        var productData=[]

        async.each(product,async function(element,cb){


                     const object=Object.assign({})
          
                    object.discount=element.discount
                    object.id =element.id
          
                    object.image =(element.image!="")?`${sails.config.custom.imageUrl}/images/product/${element.image}`:''
                                
          
                    object.offerprice =element.offerprice
                    object.price =element.price
                    object.product_category =element.product_category
                    object.status =element.status
                    object.title =element.title
                    object.shop = await Post.findOne({

                      where :{id: element.product_category.shopid},
                      select:['id','title']
                    })
                    
                    object.createdAt =element.createdAt;
                    object.updatedAt =element.updatedAt;
          
                    productData.push(object);
                    cb()
          console.log(object)
                

        },function(){


          return ResponseService.json(200, res, "record fetch Successful", productData)

        })

 

      })
      .catch(function (err) {
        return ResponseService.json(500, res, err)
      });
    },
    //
    // ──────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: U P L O A D   P R O D U C T   I M A G E : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //
    async uploadProductImage(req,res){
      var request_data=req.query;
      sails.log(request_data.id)
      var setfilename=`${Date.now()}.jpg`
      req.file('product_image').upload({
        saveAs:setfilename,
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/product/'),
        maxBytes: 10000000
      }, async function whenDone(err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
        if (uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }else{
          var obj={
            image :setfilename,
          }
          await Product.update({id:request_data.id})
          .set(obj).fetch()
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
    // ──────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: U P D A T E   P R O D U C T   A C T I V E  S T A T U S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //
    async updateProductActiveStaus(req, res) {
      var request_data = req.body;
      var criteria = {id: request_data._id};
      var valuesToSet = {active: request_data.active};
      
      await Product.count(criteria)
      .then(async  (count)=> {
        if( count>0){
          await Product.update(criteria)
          .set(valuesToSet)
          .fetch()
          .then( (data)=> {
            return ResponseService.json(200, res, "Active status updated Successfully", data);
          })
        }
        else{
          return ResponseService.json(400, res, "No data found");
        }    })
        .catch( (err)=> {
          return ResponseService.json(500, res, err);
        });
    },
  };
  