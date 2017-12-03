var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('./task');

var schema = new mongoose.Schema({
  title: String,
  created: { type: Date, default: Date.now, required: false },
  edited: { type: Date, default: Date.now, required: false },
  completed: { type: Boolean, default: false },
  tasks: [Task.schema]
}, {
  toObject: {
    transform: function(doc, ret, opts) {
      delete ret.__v;
    }
  }
});

var Todo = mongoose.model('Todo', schema);

module.exports = Todo
