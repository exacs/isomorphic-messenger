import pg from 'pg';
pg.defaults.ssl = true;

const connectionString = process.env.DATABASE_URL || {
  user: 'carlos',
  databse: 'minimal_messenger',
  password: 'carlos',
  port: 5432,
};

const client = new pg.Client(connectionString);

export const messagesSchema = () => new Promise((accept, reject) => {
  const fields = [
    'message_id SERIAL PRIMARY KEY',
    'text TEXT',
  ];
  client.connect(connErr => {
    if (connErr) {
      reject('Error on connection. Code:', connErr.code);
    } else {
      client.query(`CREATE TABLE IF NOT EXISTS messages (${fields.join(', ')})`)
            .then(() => accept())
            .catch(() => reject('Error on CREATE'))
            .then(() => client.end());
    }
  });
});
