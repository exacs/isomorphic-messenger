/* eslint-env mocha */
/**
 * Test-suite for actions
 */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);
import nock from 'nock';
import configureStore from 'redux-mock-store';

import api from 'middleware/api.js';
import { SEND_MESSAGE_REQUEST,
         SEND_MESSAGE_SUCCESS,
         SEND_MESSAGE_FAILURE,
         FETCH_MESSAGES_REQUEST,
         FETCH_MESSAGES_SUCCESS,
         FETCH_MESSAGES_FAILURE,
         sendMessage,
         fetchMessages } from 'actions/index.js';

const middlewares = [api];
const mockStore = configureStore(middlewares);

describe('Synchronous actions', function() {
  it('Should be ignored by API middleware', function() {
    const store = mockStore({});

    store.dispatch({ type: 'action1' });
    expect(store.getActions()).to.be.deep.equal([
      { type: 'action1' },
    ]);
  });
});


describe('Asynchronous action "sendMessage"', function() {
  it('Should create SEND_MESSAGE_SUCCESS when send message is correct', function() {
    // Nock
    nock('http://example-api.com')
      .post('/messages', { text: 'Some message' })
      .reply(200, { body: { text: 'Some message' } });

    const store = mockStore({});

    return store.dispatch(sendMessage('Some message'))
                .then(res => {
                  const [{ type: t1 }, { type: t2 }] = store.getActions();
                  expect([t1, t2]).to.be.deep.equal([
                    SEND_MESSAGE_REQUEST,
                    SEND_MESSAGE_SUCCESS,
                  ]);

                  const [a1, a2] = store.getActions();
                  expect(a2.response.body.text).to.be.equal('Some message');
                });
  });

  it('Should create SEND_MESSAGE_FAILURE when send message is not correct', function() {
    nock('http://example-api.com')
      .post('/messages')
      .reply(500, {});

    const store = mockStore({});

    return store.dispatch(sendMessage('Some message'))
                .then(() => {
                  const [{ type: t1 }, { type: t2 }] = store.getActions();
                  expect([t1, t2]).to.be.deep.equal([
                    SEND_MESSAGE_REQUEST,
                    SEND_MESSAGE_FAILURE,
                  ]);
                });
  });
});

describe('Asynchronous action "fetchMessages"', function() {
  it('Should create FETCH_MESSAGES_SUCCESS always', function() {
    // Nock
    nock('http://example-api.com')
      .get('/chats/1/messages')
      .reply(200, { body: ['Some message', 'some other'] });

    const store = mockStore({});

    return store.dispatch(fetchMessages())
                .then(() => {
                  const [{ type: t1 }, { type: t2 }] = store.getActions();
                  expect([t1, t2]).to.be.deep.equal([
                    FETCH_MESSAGES_REQUEST,
                    FETCH_MESSAGES_SUCCESS,
                  ]);
                });
  });

  it('Should create FETCH_MESSAGES_SUCCESS always', function() {
    // Nock
    nock('http://example-api.com')
      .get('/chats/1/messages')
      .reply(500, {});

    const store = mockStore({});

    return store.dispatch(fetchMessages())
                .then(() => {
                  const [{ type: t1 }, { type: t2 }] = store.getActions();
                  expect([t1, t2]).to.be.deep.equal([
                    FETCH_MESSAGES_REQUEST,
                    FETCH_MESSAGES_FAILURE,
                  ]);
                });
  });
});
