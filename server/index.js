import express from 'express';
import App from 'components/App';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import Root from 'containers/Root';

const initialState = [];
const reducer = (state = initialState) => state;
const store = createStore(reducer, initialState);

const app = express();
app.use(express.static('public'));
app.use((req, res) => {
  res.send(`
    <!DOCTYPE html>
    <title>An isomorphic application!!</title>
    <div id=root>${renderToString(<Root store={ store } />)}</div>
  `);
});

export default app;
