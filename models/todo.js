var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('./task').Task;

var schema = new mongoose.Schema({
  title: String,
  created: { type: Date, default: Date.now, required: false },
  edited: { type: Date, default: Date.now, required: false },
  completed: { type: Boolean, default: false },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, {
  toObject: {
    transform: function(doc, ret, opts) {
      delete ret.__v;
    }
  }
});

var Todo = mongoose.model('Todo', schema);

module.exports = Todo
