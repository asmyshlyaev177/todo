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
    if (err) { return res.json(err); };
    res.end(JSON.stringify(data ? data.toObject() : {message: 'not found'}) );
  });
});

router.post('/', function(req, res, next) {
  if (!req.body.title) { return res.json({message: 'title is required!'}) };
  Todo.create({ title: req.body.title }, function(err, data) {
    if (err) { return res.json(err) };
    res.end(JSON.stringify(data));
  });
});

router.patch('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function(err, doc) {
    if (err) { return res.json(err) };
    doc.title = req.body.title || doc.title;
    doc.edited = (new Date).toISOString();
    doc.completed = req.body.completed || doc.completed;
    doc.save()
      .then(doc => res.json(doc.toObject()))
      .catch(err => res.json(err));
  })
});

router.delete('/:id', function(req, res, next) {
  Todo.deleteOne({ id: req.params.id }, function(err, data) {
    if (err) { return res.json(err) };
    res.end(JSON.stringify(data));
  });
});

module.exports = router;
