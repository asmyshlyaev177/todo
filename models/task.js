var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  title: String,
  created: { type: Date, default: Date.now, required: false },
  edited: { type: Date, default: Date.now, required: false },
  completed: { type: Boolean, default: false }
}, {
  toObject: {
    transform: function(doc, ret, opts) {
      delete ret.__v;
    }
  }
});

var Task = mongoose.model('Task', schema);

module.exports = { Task, schema }
