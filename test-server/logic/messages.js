/* eslint-env mocha */

// Testers
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);

// Elements to test
import { read, write } from '../../server/logic/messages.js';

describe('Messages module (read and write messages)', () => {
});
