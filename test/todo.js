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

after(() => {
  Todo.remove({}).then(err => {
    Task.remove({}, err => { 
      app.db.close();
      process.exit(0);
    });
  });
})

describe('Todo API', () => {

  var todoid;
  var taskid;
  var todoid2;
  var taskid2;

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
        res.body.should.to.have.own.property('created')
          .to.be.an('string');
        res.body.should.to.have.own.property('edited')
          .to.be.an('string');
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
        todoid = todo._id
        chai.request(app)
          .get('/api/todo/' + todoid)
          .end((err, res) => {
            res.should.be.json;
            res.should.have.status(200);
            res.body.should.have.own.property('title', 'testTodo');
            done();
          });
      })
  });
  it('Should add a new task to todo', done => {
    chai.request(app)
      .post('/api/todo/' + todoid + '/task')
      .send({ title: 'testtask1' })
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.to.have.own.property('completed', false);
        res.body.should.to.have.own.property('created')
          .to.be.an('string');
        res.body.should.to.have.own.property('edited')
          .to.be.an('string');
        taskid = res.body._id;
        res.body.should.have.own.property('title', 'testtask1')
        done();
      });
  });
  it('Should have new task in todo', done => {
    chai.request(app)
      .get('/api/todo/' + todoid)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.have.own.property('_id');
        expect(todoid === res.body._id);
        var task = res.body.tasks[0];
        expect(task._id === taskid);
        done();
      });
  });
  it('Should change todo', done => {
    chai.request(app)
      .patch('/api/todo/' + todoid)
      .send({ title: 'abcdef', completed: true })
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.have.own.property('title', 'abcdef');
        res.body.should.have.own.property('completed', true);
        var task = res.body.tasks[0];
        expect(task._id === taskid);
        done();
      });
  });
  it('Should change task', done => {
    chai.request(app)
      .patch('/api/todo/' + todoid + '/task/' + taskid)
      .send({ title: 'altered task title', completed: true })
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.have.own.property('title', 'altered task title');
        res.body.should.have.own.property('completed', true);
        done();
      });
  });
  it('should create second todo with task', done => {
    chai.request(app)
      .post('/api/todo')
      .send({ title: 'testTodo2' })
      .end(async function(err, res) {
        res.should.have.status(200);
        res.body.should.to.have.own.property('title', 'testTodo2');
        res.body.should.to.have.own.property('tasks')
          .that.is.to.be.an('array')
          .that.is.empty;
        let docCount = await Todo.count();
        docCount.should.to.equal(2);
        todoid2 = res.body._id;
        chai.request(app)
          .post('/api/todo/' + todoid2 + '/task')
          .send({ title: 'testtask2' })
          .end(async function(err, res) {
            res.should.be.json;
            res.should.have.status(200);
            res.body.should.have.own.property('title', 'testtask2')
            let taskCount = await Task.count();
            taskCount.should.to.equal(2);
            taskid2 = res.body._id;
            done();
          });
      });
  });
  it('it should GET all todos', done => {
    chai.request(app)
      .get('/api/todo')
      .end((err, res) => {
        res.should.to.be.json;
        res.should.have.status(200);
        res.body.should.to.be.an('array')
          .that.to.have.lengthOf(2);
        done();
      });
  });
  it('remove a task', done => {
    chai.request(app)
      .delete('/api/todo/' + todoid2 + '/task/' + taskid2)
      .end((err, res) => {
        res.should.to.be.json;
        res.should.have.status(200);
        res.body.should.to.be.eql({ n: 1, ok: 1});
        done();
      });
  });
  it('todo should doesnt have deleted task', done => {
    chai.request(app)
      .get('/api/todo/' + todoid2)
      .end(async function(err, res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.have.own.property('tasks')
          .that.is.to.be.an('array')
          .that.is.empty;
        let taskCount = await Task.count();
        expect(taskCount === 2);
        done();
      });
  });
  it('should delete todo without tasks', done => {
    chai.request(app)
      .delete('/api/todo/' + todoid2)
      .end(async function(err, res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.should.to.be.eql({ n: 1, ok: 1 });
        let todoCount = await Todo.count();
        expect(todoCount === 1);
        done();
      });
  });
  it('should delete todo with task', done => {
    chai.request(app)
      .delete('/api/todo/' + todoid)
      .end(async function(err, res) {
        res.should.to.be.json;
        res.should.have.status(200);
        res.body.should.to.be.eql({ n: 1, ok: 1});
        let todoCount = await Todo.count();
        expect(todoCount === 0);
        let taskCount = await Task.count();
        expect(taskCount === 0);
        done();
      });
  });

});
