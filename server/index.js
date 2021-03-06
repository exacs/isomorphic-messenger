import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routers/api';
import postRouter from './routers/post';
import reactRouter from './routers/react';
import { messagesSchema } from './data/postgres-init';

const app = express();
const jsonParser = bodyParser.json();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use('/api', jsonParser, apiRouter);
app.post('*', urlencodeParser, postRouter);
app.get('*', reactRouter);

const PORT = process.env.PORT || 3000;

messagesSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening from port', PORT);
    });
  })
  .catch(err => console.log(err));
