/* eslint-env mocha */

// Testers
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);
import proxyquire from 'proxyquire';

//
// pg.client stubs
//
// A pg client that always fails queries
const pgClientFailedQueryStub = {
  query() {
    return new Promise((accept, reject) => reject());
  },
};

// A pg client that always return one row
const pgClientOneRowStub = {
  query() {
    return new Promise(accept =>
      accept({
        rows: [
          { message_id: 1, text: 'Row 1 text', creation_date: 0 },
        ],
      })
    );
  },
};

const pgClientOneChatRowStub = {
  query() {
    return new Promise(accept =>
      accept({
        rows: [
          { chat_id: 1, title: 'Row 1 title' },
        ],
      })
    );
  },
};

// A pg client that always succeed a query
const pgClientSuccessQueryStub = {
  query() {
    return new Promise(accept => accept());
  },
};

//
// pg stubs
//
// A pg object that always have a failed connection
const pgFailedConnectionStub = {
  connect(connectionString, callback) {
    callback(true, null, () => {});
  },
};

// A pg object that has a successful connection but fails on queries
const pgSuccessConnectionStubFactory = client => ({
  connect(connectionString, callback) {
    callback(false, client, () => {});
  },
});

describe('getMessages', function() {
  it('Should notify the connection error', function() {

    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgFailedConnectionStub,
    });

    return expect(postgres.getMessages()).to.be.eventually.rejected;
  });

  it('Should notify the query error', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientFailedQueryStub),
    });

    return expect(postgres.getMessages()).to.be.eventually.rejected;
  });

  it('Should return rows of messages', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientOneRowStub),
    });

    return expect(postgres.getMessages()).to.be.eventually.deep.equal([{
      id: 1,
      text: 'Row 1 text',
    }]);
  });
});

describe('createMessages', function() {
  it('Should notify the connection error', function() {

    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgFailedConnectionStub,
    });

    return expect(postgres.createMessage()).to.be.eventually.rejected;
  });

  it('Should notify the query error', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientFailedQueryStub),
    });

    return expect(postgres.createMessage()).to.be.eventually.rejected;
  });

  it('Should notify the query success', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientSuccessQueryStub),
    });

    return expect(postgres.createMessage()).to.be.eventually.fulfilled;
  });
});

describe('getMessagesFromChat', function() {
  it('Should notify the connection error', function() {

    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgFailedConnectionStub,
    });

    return expect(postgres.getMessagesFromChat(1)).to.be.eventually.rejected;
  });

  it('Should notify the query error', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientFailedQueryStub),
    });

    return expect(postgres.getMessagesFromChat(1)).to.be.eventually.rejected;
  });

  it('Should return rows of messages', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientOneRowStub),
    });

    return expect(postgres.getMessagesFromChat(1)).to.be.eventually.deep.equal([{
      id: 1,
      text: 'Row 1 text',
      creationDate: 0,
    }]);
  });
});

describe('createMessageInChat', function() {
  it('Should notify the connection error', function() {

    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgFailedConnectionStub,
    });

    return expect(postgres.createMessageInChat()).to.be.eventually.rejected;
  });

  it('Should notify the query error', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientFailedQueryStub),
    });

    return expect(postgres.createMessageInChat()).to.be.eventually.rejected;
  });

  it('Should notify the query success', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientOneRowStub),
    });

    return expect(postgres.createMessageInChat(1, '')).to.be.eventually.deep.equal({
      id: 1,
      text: 'Row 1 text',
      creationDate: 0,
    });
  });
});

describe('getChatInfo', function() {
  it('Should notify the connection error', function() {

    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgFailedConnectionStub,
    });

    return expect(postgres.getChatInfo()).to.be.eventually.rejected;
  });

  it('Should notify the query error', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientFailedQueryStub),
    });

    return expect(postgres.getChatInfo()).to.be.eventually.rejected;
  });

  it('Should return a single row', function() {
    const postgres = proxyquire('../../server/data/postgres.js', {
      pg: pgSuccessConnectionStubFactory(pgClientOneChatRowStub),
    });

    return expect(postgres.getChatInfo(1)).to.be.eventually.deep.equal({
      id: 1,
      title: 'Row 1 title',
    });
  });
});
