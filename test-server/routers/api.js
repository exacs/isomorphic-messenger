/* eslint-env mocha */

// Testers
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);
import proxyquire from 'proxyquire';

import request from 'supertest';
import express from 'express';


describe('GET /messages', function() {
  // Change read and write functions from logic
  const messagesLogicStub = {
    read: () => new Promise(accept => {
      accept([]);
    }),
    write: () => new Promise((accept, reject) => {
      reject();
    }),
  };

  it('Should response with a emtpy array JSON object', function(done) {
    const apiRouter = proxyquire('../../server/routers/api', {
      '../logic/messages': messagesLogicStub,
    }).default;
    const app = express();
    app.use(apiRouter);

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
