import express from 'express';
import HelloServer from 'components/HelloServer';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = express();
app.use(express.static('public'));
app.use((req, res) => {
  res.send(`
    <!DOCTYPE html>
    <title>An isomorphic application!!</title>
    <div id=root>${renderToString(<HelloServer />)}</div>
    <script src=bundle.js></script>
  `);
});

export default app;
