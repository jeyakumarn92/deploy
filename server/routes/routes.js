var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Deploy = require('../../models/Deploy');
router.get('/', function(req, res){
  res.render('index')
});
router.route('/api/deploys')
.post(function(req,res) {
 var deploy = new Deploy();
  deploy.url = req.body.url;
  deploy.templateName = req.body.templateName;
  deploy.version = req.body.version;
  deploy.deployedAt = new Date();
deploy.save(function(err,data) {
      if (err)
        res.send(err);
      res.send({'id':data._id});
      return;
  });
})


router.delete('/api/delete/:id', function(req, res){
 var id = req.params.id;
 Deploy.find({_id: id}).remove().exec(function(err, deploy) {
  if(err)
   res.send(err)
  res.send('Deploy successfully deleted!');
 })
});
router.get('/api/deploys',function(req, res) {
  try{
    Deploy.find({}, function(err, deploys) {
      if (err)
      res.send(err);
      res.json(deploys);
     });
  }catch(err){
    res.send(err)
  }
});
module.exports = router;