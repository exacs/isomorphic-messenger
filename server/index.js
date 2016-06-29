import express from 'express';
import App from 'components/App';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Root from 'containers/Root';
import createStore from 'store/configureStore';


const app = express();
app.use(express.static('public'));
app.use((req, res) => {
  const initialState = [
    'Diodenoo qué dise usteer va usté muy cargadoo condemor está la cosa muy malar qué dise usteer no puedor papaar papaar',
    'Se calle ustée jarl mamaar consectetur por la gloria de mi madre ad',
    'Laboris minim ex magna te voy a borrar el cerito velit. ',
  ];
  const store = createStore(initialState);

  res.send(`
    <!DOCTYPE html>
    <link rel=stylesheet src=main.css>
    <title>An isomorphic application!!</title>
    <div id=root>${renderToString(<Root store={ store } />)}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
    <script src=bundle.js></script>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Listening from port', PORT);
});
