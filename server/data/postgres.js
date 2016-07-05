/**
 * Access to persistence
 */

import pg from 'pg';
pg.defaults.ssl = true;

const client = new pg.Client(process.env.DATABASE_URL);

export const getMessages = (limit = 10) => new Promise((accept, reject) => {
  const err = client.connect();
  if (err) reject('Connection error');

  client.query('SELECT * FROM messages LIMIT $1', [limit])
        .then(res => {
          accept(res.rows.map(row => row.text));
        })
        .then(() => client.end());
});

export const createMessage = (text) => new Promise((accept) => {
  client.query('INSERT INTO messages (text) VALUES ($1)', [text])
        .then(res => accept(res))
        .then(() => client.end());
});
