var express = require('express');
var router = express.Router(); //creates a new router object

/* GET home page based on '/' route */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
