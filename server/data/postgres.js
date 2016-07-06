/**
 * Access to persistence
 */

import pg from 'pg';
pg.defaults.ssl = true;

const connectionString = process.env.DATABASE_URL || {
  user: 'carlos',
  databse: 'minimal_messenger',
  password: 'carlos',
  port: 5432,
};


export const getMessages = (/* limit = 10 */) => new Promise((accept, reject) => {
  pg.connect(connectionString, (connErr, client, done) => {
    if (connErr) {
      done();
      console.log(connErr);
      reject('Error on connection');
      return;
    }

    client.query('SELECT * FROM messages')
          .then(res => accept(res.rows.map(row => row.text)))
          .catch(() => reject('Error on SELECT'))
          .then(done);
  });
});

export const createMessage = (text) => new Promise((accept, reject) => {
  pg.connect(connectionString, (connErr, client, done) => {
    if (connErr) {
      done();
      console.log(connErr);
      reject('Error on connection');
      return;
    }

    client.query('INSERT INTO messages (text) values ($1)', [text])
          .then(res => accept(res))
          .catch(() => reject('Error on INSERT query'))
          .then(() => client.end());
  });
});
