module.exports = {
    json:async function (req,res) {
    await   Review.count().then((data)=>{
          
    return res.json(data);
})
      
          
    }
};
