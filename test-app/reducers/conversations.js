/* eslint-env mocha */
/**
 * Test-suite for messages-related reducer
 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);

import deepFreeze from 'deep-freeze';
import { SEND_MESSAGE_REQUEST,
         SEND_MESSAGE_SUCCESS,
         SEND_MESSAGE_FAILURE } from '../../app/actions/index';
import reduce from '../../app/reducers/conversations.js';

describe('reducers/conversations: Unkwnown action', function() {
  it('Should ignore an unknown action', function() {
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    deepFreeze(obj);
    const action = {
      type: '',
    };

    const newState = reduce(obj, action);
    expect(newState).to.be.deep.equal(obj);
  });
});

describe('reducers/conversations: Action SEND_MESSAGE_REQUEST', function() {
  it('Should update the conversation object', function() {
    const obj = {
      1: {
        messages: [],
      },
    };
    deepFreeze(obj);
    const action = {
      type: SEND_MESSAGE_REQUEST,
      key: 'key1',
      text: 'Hello World',
      chatId: 1,
    };
    const newState = reduce(obj, action);
    expect(newState[1].messages).to.be.deep.equal(['key1']);
  });

  it('Should create a new conversation if not exists', function() {
    const obj = {};

    deepFreeze(obj);
    const action = {
      type: SEND_MESSAGE_REQUEST,
      key: 'key1',
      text: 'Hello World',
      chatId: 1,
    };

    const expectedNewState = {
      1: { messages: ['key1'] },
    };
    const newState = reduce(obj, action);
    expect(newState).to.be.deep.equal(expectedNewState);
  });
});
