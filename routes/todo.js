var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.end(JSON.stringify(req.params));
});

module.exports = router;
