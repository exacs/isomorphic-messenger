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
import reduce, { SENDING, SUCCESS, FAILURE } from '../../app/reducers/index.js';

describe('Strange action', function() {
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

describe('Action SEND_MESSAGE_REQUEST', function() {
  it('Should reduce correctly', function() {
    const obj = {};
    deepFreeze(obj);
    const action = {
      type: SEND_MESSAGE_REQUEST,
      key: 'key1',
      text: 'Hello World',
    };
    const newState = reduce(obj, action);
    expect(newState.key1.text).to.be.equal('Hello World');
    expect(newState.key1.status).to.be.equal(SENDING);
  });
});

describe('Action SEND_MESSAGE_SUCCESS', function() {
  const obj = {
    key_ok: {
      id: 870,
      text: 'Message 870',
      status: SENDING,
    },
  };
  deepFreeze(obj);
  it('Should reduce correctly', function() {
    const action = {
      type: SEND_MESSAGE_SUCCESS,
      key: 'key_ok',
    };

    const newState = reduce(obj, action);
    expect(newState.key_ok).to.be.deep.equal({
      id: 870,
      text: 'Message 870',
      status: SUCCESS,
    });
  });

  it('Should ignore if key is not found', function() {
    const action = {
      type: SEND_MESSAGE_SUCCESS,
      key: 'key_no',
    };

    const newState = reduce(obj, action);
    expect(newState).to.deep.equal(obj);
  });
});

describe('Action SEND_MESSAGE_FAILURE', function() {
  const obj = {
    key_ok: {
      id: 870,
      text: 'Message 870',
      status: SENDING,
    },
  };
  deepFreeze(obj);
  it('Should reduce correctly', function() {
    const action = {
      type: SEND_MESSAGE_FAILURE,
      key: 'key_ok',
    };

    const newState = reduce(obj, action);
    expect(newState.key_ok).to.be.deep.equal({
      id: 870,
      text: 'Message 870',
      status: FAILURE,
    });
  });

  it('Should ignore if key is not found', function() {
    const action = {
      type: SEND_MESSAGE_FAILURE,
      key: 'key_no',
    };

    const newState = reduce(obj, action);
    expect(newState).to.deep.equal(obj);
  });
});
