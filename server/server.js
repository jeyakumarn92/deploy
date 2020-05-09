var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var Deploy = require('../models/Deploy');
var app = express();
var mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
mongoose.connect('mongodb://jeyn:jeyn92@ds157112.mlab.com:57112/deploy',{ useMongoClient: true });
mongoose.connection.once('open', function() { 
    console.log('Connected to the Database.');
  });
  mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
  });
app.use('/', router);
module.exports=app;