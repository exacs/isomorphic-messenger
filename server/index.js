import express from 'express';
import App from 'components/App';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Root from 'containers/Root';
import createStore from 'store/configureStore';


const app = express();
app.use(express.static('public'));
app.use((req, res) => {
  const initialState = ['M1', 'M2', 'M3'];
  const store = createStore(initialState);

  res.send(`
    <!DOCTYPE html>
    <title>An isomorphic application!!</title>
    <div id=root>${renderToString(<Root store={ store } />)}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
    <script src=bundle.js></script>
  `);
});

export default app;
