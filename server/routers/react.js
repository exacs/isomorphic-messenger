/**
 * React Middleware for Express
 *
 * Responses with a HTML
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from 'containers/Root';
import createStore from 'store/configureStore';

export default (req, res) => {
  const initialState = [
    'Diodenoo qué dise usteer va usté muy cargadoo condemor está la cosa muy malar'
    + 'qué dise usteer no puedor papaar papaar',
    'Se calle ustée jarl mamaar consectetur por la gloria de mi madre ad',
    'Laboris minim ex magna te voy a borrar el cerito velit. ',
  ];
  const store = createStore(initialState);

  res.set('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <link rel=stylesheet href=main.css>
    <title>An isomorphic application!!</title>
    <div id=root>${renderToString(<Root store={store} />)}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
  `);
};
