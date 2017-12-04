process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Todo = require('../models/todo');
var Task = require('../models/task').Task;

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Todo', () => {
  beforeEach(done => {
    Todo.remove({}).then(err => {
      Task.remove({}, err => { done(); });
    });
  });
  
  describe('get all todos', () => {
    it('it should GET all todos', done => {
      chai.request(app)
        .get('/api/todo')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
        });
    });
  });

});
