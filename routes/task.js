
var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');
var Task = require('../models/task').Task;

router.post('/:todoid', function(req, res, next) {
  if (!req.body.title) { return res.status(500).json({error: 'title is required!'}) };
  Todo.findById(req.params.todoid, function(err, doc) {
    if (err) { return res.status(500).json({ error: err.message }) };
    doc.tasks.push({ title: req.body.title });
    doc.save()
      .then(d => res.json(d.toObject()) )
      .catch(err => res.status(500).json({ error: err.message }) );
  });
});

router.patch('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function(err, doc) {
    if (err) { return res.status(500).json({ error: err.message }) };
    doc.title = req.body.title || doc.title;
    doc.edited = (new Date).toISOString();
    doc.completed = req.body.completed || doc.completed;
    doc.save()
      .then(doc => res.json(doc.toObject()))
      .catch(err => res.status(500).json({ error: err.message }));
  })
});

router.delete('/:taskid', function(req, res, next) {
  Todo.deleteOne({ _id: req.params.id }, function(err, data) {
    if (err) { return res.status(500).json({ error: err.message }) };
    res.json(data);
  });
});

module.exports = router;
