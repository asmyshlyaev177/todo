process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Todo = require('../models/todo');
var Task = require('../models/task').Task;

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Todo', () => {
  beforeEach(done => {
    Todo.remove({}).then(err => {
      Task.remove({}, err => { done(); });
    });
  });
  
  describe('/GET all todos', () => {
    it('it should GET all todos', done => {
      chai.request(app)
        .get('/api/todo')
        .end((err, res) => {
          res.should.to.be.json;
          res.should.have.status(200);
          res.body.should.to.be.an('array').that.is.empty;
          done();
        });
    });
  });

});
