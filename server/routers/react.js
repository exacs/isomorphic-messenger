/**
 * React Middleware for Express
 *
 * Responses with a HTML
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from 'containers/Root';
import createStore from 'store/configureStore';
import { SUCCESS } from 'reducers/messages';
import { read } from '../logic/messages';

export default (req, res) => {
  console.log('REACT router: %s %s %s', req.method, req.url, req.path);
  read().then(messages => {
    const initialState = {
      messages: messages.map(
        (message, i) => ({ text: message, id: i, status: SUCCESS })
      ),
      conversations: {},
    };

    const store = createStore(initialState);

    res.set('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <link rel=stylesheet href=/main.css>
      <title>An isomorphic application!!</title>
      <div id=root>${renderToString(<Root store={store} />)}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
      <script src=/bundle.js></script>
    `);
  }).catch(err => {
    console.log(err);
    res.send('Error in request');
  });
};
