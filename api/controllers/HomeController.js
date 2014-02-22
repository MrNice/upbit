module.exports = {
    
  index : function(req, res){
    console.log("using the code");
    var data = {
      partials : {
        header : './../partials/header',
        footer : './../partials/footer'
      }
    };
    
    res.view(data);
  }
  
};