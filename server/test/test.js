process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()

const Task = require('../models/task')

chai.use(chaiHttp)

describe('Todos', () => {
  beforeEach((done) => {
    Task.deleteMany({}, (err) => {
      done()
    })
  })

  describe('/GET task', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(app)
        .get('/api/tasks')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
        done()
        })
    })
  })

  describe('/POST task', () => {
    it('it should POST a task without completed field to true', (done) => {
      const task = {
        task: 'test task',
        completed: true,
      }
      chai.request(app)
        .post('/api/tasks')
        .send(task)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('completed').eql(true)
        done()
        })
    })
  })
})
