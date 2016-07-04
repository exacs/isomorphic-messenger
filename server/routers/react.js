/**
 * React Middleware for Express
 *
 * Responses with a HTML
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from 'containers/Root';
import createStore from 'store/configureStore';
import { SUCCESS } from 'reducers/index';
import { read } from '../logic/messages';

export default (req, res) => {
  read().then(initialState => {
    const store = createStore(initialState.map(
      (message, i) => ({ text: message, id: i, status: SUCCESS })
    ));

    res.set('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <link rel=stylesheet href=/main.css>
      <title>An isomorphic application!!</title>
      <div id=root>${renderToString(<Root store={store} />)}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
      <script src=/bundle.js></script>
    `);
  });
};
