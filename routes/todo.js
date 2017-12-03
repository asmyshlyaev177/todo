var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.get('/', function(req, res, next) {
  // var r = await req.app.get('db').model('Tank').find();
  // res.end(JSON.stringify( r.map(r => r.toObject()) ));
  Todo.find({}, function(err, data) {
    if (err) { return res.json(err) };
    res.end(JSON.stringify(data.map(d => d ? d.toObject(): null) ));
  });
});

router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function(err, data) {
    if (err) { return res.end(JSON.stringify(err)) };
    res.end(JSON.stringify(data.toObject()) );
  });
});

router.post('/', function(req, res, next) {
  Todo.create({ title: req.body.title }, function(err, data) {
    if (err) { return res.json(err) };
    res.end(JSON.stringify(data));
  });
});

router.patch('/:id', async function(req, res, next) {
  let result;
  Todo.findById(req.params.id, function(err, doc) {
    if (err) { return res.json(err) };
    doc.title = req.body.title;
    console.log(doc.title);
    doc.edited = (new Date).toISOString();
    doc.save()
      .then(doc => res.json(doc.toObject()))
      .catch(err => res.json(err));
  })
});

router.delete('/:id', function(req, res, next) {
  req.app.get('db').model('Tank').find({}, function(err, data) {
    if (err) { return res.json(err) };
    res.end(JSON.stringify(data));
  });
});

module.exports = router;
