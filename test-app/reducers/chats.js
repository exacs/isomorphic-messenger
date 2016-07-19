/* eslint-env mocha */
/**
 * Test-suite for messages-related reducer
 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);

import deepFreeze from 'deep-freeze';
import { SEND_MESSAGE_REQUEST } from '../../app/actions/index';
import reduce from '../../app/reducers/chats.js';

describe('reducers/chats: Unkwnown action', function() {
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

describe('reducers/chats: Action SEND_MESSAGE_REQUEST', function() {
  it('Should update the chat object', function() {
    const obj = {
      1: {
        messages: ['key1'],
      },
    };
    deepFreeze(obj);
    const action = {
      type: SEND_MESSAGE_REQUEST,
      key: 'key2',
      text: 'Hello World',
      chatId: 1,
    };
    const newState = reduce(obj, action);
    expect(newState[1].messages).to.be.deep.equal(['key1', 'key2']);
  });

  it('Should create a new chat if not exists', function() {
    const obj = {};
    const obj1 = {
      1: {},
    };

    deepFreeze(obj);
    deepFreeze(obj1);
    const action = {
      type: SEND_MESSAGE_REQUEST,
      key: 'key1',
      text: 'Hello World',
      chatId: 1,
    };

    const newState = reduce(obj, action);
    const newState1 = reduce(obj1, action);
    expect(newState[1].messages).to.be.deep.equal(['key1']);
    expect(newState1[1].messages).to.be.deep.equal(['key1']);
  });
});
