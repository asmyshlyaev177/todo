var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  var r = await req.app.get('db').model('Tank').find();
  res.end(JSON.stringify(r));
  // req.app.get('db').model('Tank').find({}, function(err, data) {
  //   if (err) handleErr(err);
  //   res.end(JSON.stringify(data));
  // });
});

module.exports = router;
