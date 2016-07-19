/**
 * Access to persistence
 */

import pg from 'pg';
pg.defaults.ssl = true;

const connectionString = process.env.DATABASE_URL || {
  user: 'carlos',
  database: 'minimal_messenger',
  password: 'carlos',
  port: 5432,
};

const connect = (reject, callback) => {
  pg.connect(connectionString, (connErr, client, done) => {
    if (connErr) {
      done();
      reject('Error on connection');
    }

    callback(client, done);
  });
};

export const getChats = () => new Promise((accept, reject) => {
  connect(reject, (client, done) => {
    client.query('SELECT * FROM chats')
          .then(res => accept(res.rows.map(row => ({
            id: row.chat_id,
            title: row.title,
          }))))
          .catch(() => reject('Error on SELECT'))
          .then(done);
  });
});

export const getMessagesFromChat = chatId => new Promise((accept, reject) => {
  connect(reject, (client, done) => {
    const fields = [
      'message_id',
      'text',
      'EXTRACT(EPOCH FROM creation_date) as creation_date',
    ];
    client.query(`SELECT ${fields.join(',')} FROM messages WHERE chat_id = $1`, [chatId])
          .then(res => accept(res.rows.map(row => ({
            id: row.message_id,
            text: row.text,
            creationDate: row.creation_date,
          }))))
          .catch(() => reject('Error on SELECT'))
          .then(done);
  });
});

export const createMessageInChat = (chatId, text) => new Promise((accept, reject) => {
  connect(reject, (client, done) => {
    const fields = [
      'message_id',
      'text',
      'EXTRACT(EPOCH FROM creation_date) as creation_date',
    ];
    client.query('INSERT INTO messages (text, chat_id) VALUES ($1, $2)' +
                 `RETURNING ${fields.join(',')}`, [text, chatId])
          .then(res => accept({
            id: res.rows[0].message_id,
            text: res.rows[0].text,
            creationDate: res.rows[0].creation_date,
          }))
          .catch(err => {console.log(err); reject('Error on INSERT query')})
          .then(done);
  });
});

export const getMessages = (/* limit = 10 */) => new Promise((accept, reject) => {
  connect(reject, (client, done) => {
    client.query('SELECT * FROM messages')
          .then(res => accept(res.rows.map(row => ({
            id: row.message_id,
            text: row.text,
          }))))
          .catch(() => reject('Error on SELECT'))
          .then(done);
  });
});

export const createMessage = (text) => new Promise((accept, reject) => {
  connect(reject, (client, done) => {
    client.query('INSERT INTO messages (text) values ($1)', [text])
          .then(res => accept(res))
          .catch(() => reject('Error on INSERT query'))
          .then(done);
  });
});


export const getChatInfo = (chatId) => new Promise((accept, reject) => {
  connect(reject, (client, done) => {
    client.query('SELECT * FROM chats WHERE chat_id = $1', [chatId])
          .then(res => accept(res.rows.map(row => ({
            id: row.chat_id,
            title: row.title,
          }))[0]))
          .catch(() => reject('Error on SELECT'))
          .then(done);
  });
});
