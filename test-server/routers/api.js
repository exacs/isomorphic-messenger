/* eslint-env mocha */

// Testers
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);
import proxyquire from 'proxyquire';

import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

// Change read and write functions from logic
const messagesLogicStub = {
  read: () => new Promise(accept => accept([])),
  write: () => new Promise(accept => accept()),
};

//
// GET /messages
//
const apiRouter = proxyquire('../../server/routers/api', {
  '../logic/messages': messagesLogicStub,
}).default;
const app = express();
app.use(jsonParser, apiRouter);

describe('GET /messages', function() {
  it('Should response with a emtpy array JSON object', function(done) {
    request(app)
      .get('/messages')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.deep.equal([]);
        done();
      });
  });
});

//
// POST /messages
//
describe('POST /messages', function() {
  it('Should show that the "text" argument is missing', function(done) {
    request(app)
      .post('/messages')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(done);
  });

  it('Should success', function(done) {
    request(app)
      .post('/messages')
      .send({ text: 'Hi' })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(done);
  });
});
