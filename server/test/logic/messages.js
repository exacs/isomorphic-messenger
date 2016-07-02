/* eslint-env mocha */

// Testers
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);

// Elements to test
import { read, write } from '../../logic/messages.js';

describe('Messages module (read and write messages)', () => {
  it('Should begin with an empty array', () =>
    expect(read()).to.eventually.be.deep.equal([])
  );

  it('Should accept a string', () =>
    expect(write('hi')).to.eventually.be.fulfilled
  );

  it('Should return now a 1-element array', () =>
    expect(read()).to.eventually.be.deep.equal(['hi'])
  );
});
