var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');
var Task = require('../models/task').Task;

router.get('/', function(req, res, next) {
  Todo.find({}).populate('tasks').exec(function(err, data) {
    if (err) { return res.status(500).json({ error: err.message }) };
    res.json(data.map(d => d ? d.toObject(): null) );
  });
});

router.get('/:todoid', function(req, res, next) {
  Todo.findById(req.params.todoid).populate('tasks').exec(function(err, data) {
    if (err) { return res.status(500).json({ error: err.message }); };
    data ? res.json(data.toObject()) : res.status(500).json({ error: 'not found' });
  });
});

router.post('/', function(req, res, next) {
  if (!req.body.title) { return res.status(500).json({ error: 'title is required!' }) };
  Todo.create({ title: req.body.title }, function(err, data) {
    if (err) { return res.status(500).json({ error: err.message }) };
    res.json(data);
  });
});

router.post('/:todoid/task', function(req, res, next) {
  if (!req.body.title) { return res.status(500).json({ error: 'title is required!' }) };
  Todo.findById(req.params.todoid, async function(err, doc) {
    if (err) { return res.status(500).json({ error: err.message }) };
    let task = await Task.create({ title: req.body.title }, function(err, data) {
      if (err) { return res.status(500).json({ error: err.message }) };
      return data
    });
    doc.tasks.push(task._id);
    doc.save()
      .then(doc => res.json(task.toObject()) )
      .catch(err => res.status(500).json(err))
  });
});

router.patch('/:todoid', function(req, res, next) {
  Todo.findById(req.params.todoid, function(err, doc) {
    if (err) { return res.status(500).json({ error: err.message }) };
    doc.title = req.body.title || doc.title;
    doc.edited = (new Date).toISOString();
    doc.completed = req.body.completed || doc.completed;
    doc.save()
      .then(doc => res.json(doc.toObject()))
      .catch(err => res.status(500).json({ error: err.message }));
  })
});

router.patch('/:todoid/task/:taskid', function(req, res, next) {
  Task.findById(req.params.taskid, function(err, doc) {
    if (err) { return res.status(500).json({ error: err.message }) };
    doc.title = req.body.title || doc.title;
    doc.edited = (new Date).toISOString();
    doc.completed = req.body.hasOwnProperty('completed') ? req.body.completed : doc.completed;
    doc.save()
      .then(doc => res.json(doc.toObject()))
      .catch(err => res.status(500).json({ error: err.message }));
  })
});

router.delete('/:todoid', function(req, res, next) {
  Todo.deleteOne({ _id: req.params.todoid }, function(err, data) {
    if (err) { return res.status(500).json({ error: err.message }) };
    res.json(data);
  });
});

router.delete('/:todoid/task/:taskid', function(req, res, next) {
  Task.deleteOne({ _id: req.params.taskid }, function(err, data) {
    if (err) { return res.status(500).json({ error: err.message }) };
    res.json(data);
  });
});

module.exports = router;
