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

after(function() {
  app.db.close();
  process.exit(0);
});

describe('Todo', () => {
  before(done => {
    Todo.remove({}).then(err => {
      Task.remove({}, err => { done(); });
    });
  })
  
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

  describe('/POST new todo', () => {
    it('should not create todo without title', done => {
      chai.request(app)
        .post('/api/todo')
        .send({ title: ''})
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.to.have.own.property('error');
          done();
        });
    });
    it('should create todo with title', done => {
      chai.request(app)
        .post('/api/todo')
        .send({ title: 'testTodo' })
        .end(async function(err, res) {
          res.should.have.status(200);
          res.body.should.to.have.own.property('title', 'testTodo');
          res.body.should.to.have.own.property('completed', false);
          res.body.should.to.have.own.property('created');
          res.body.should.to.have.own.property('edited');
          res.body.should.to.have.own.property('tasks')
            .that.is.to.be.an('array')
            .that.is.empty;
          let docCount = await Todo.count();
          docCount.should.to.equal(1);
          done();
        });
    });
    it('should get todo by id', done => {
      Todo.findOne()
        .then(todo => {
        chai.request(app)
          .get('/api/todo/' + todo._id)
          .end((err, res) => {
            res.should.be.json;
            res.should.have.status(200);
            res.body.should.have.own.property('title', 'testTodo');
            done();
          });
        })
    });
  });

});

// process.exit(0);
