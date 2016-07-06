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

const client = new pg.Client(connectionString);

export const getMessages = (limit = 10) => new Promise((accept, reject) => {
  client.connect(connErr => {
    if (connErr) {
      reject('Error on connection. Code:', connErr.code);
    } else {
      client.query('SELECT * FROM messages')
            .then(res => accept(res.rows.map(row => row.text)))
            .catch(() => reject('Error on SELECT'))
            .then(() => client.end());
    }
  });
});

export const createMessage = (text) => new Promise((accept, reject) => {
  client.connect(connErr => {
    if (connErr) {
      reject('Error on connection. Code:', connErr.code);
    } else {
      client.query('INSERT INTO messages (text) values ($1)', [text])
            .then(res => accept(res))
            .catch(() => reject('Error on INSERT query'))
            .then(() => client.end());
    }
  });
});
