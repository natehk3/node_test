//load the express module
var express = require('express');
//used ot get an express.Router object
var router = express.Router();

//The route defines a callback that will be invoked whenever an HTTP GET request with the correct pattern is detected
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
