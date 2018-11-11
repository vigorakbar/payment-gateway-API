var express = require('express');
var router = express.Router();

router.get('/get/:id', function(req, res) {
  var id = req.params.id;
});

router.post('/create', function(req, res) {

});

router.post('/update', function(req, res) {

});

router.post('/delete', function(req, res) {
  
});

module.exports = router;
