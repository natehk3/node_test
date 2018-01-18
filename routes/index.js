//load the express module
var express = require('express');
var router = express.Router(); //creates a new router object

// GET home page based on '/' route
//res.render is used to render a specific template along with the values of named variables passed in an object, and then send the result as a response.
//the title: sends in the value 'Express' to the template
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
