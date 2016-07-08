require('babel-register');

const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./server/routers/api').default;

const app = express();
const jsonParser = bodyParser.json();

const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

const config = require('./webpack.config.client-dev');
const compiler = webpack(config);
const options = {
  noInfo: true,
  publicPath: config.output.publicPath,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    // poll: true,
  },
};

app.use(webpackDev(compiler, options));
app.use(webpackHot(compiler));
app.use('/api', jsonParser, apiRouter);
app.use((req, res) => {
  res.send(`
    <!DOCTYPE html>
    <title>Isomorphic Application - dev</title>
    <div id="root"></div>
    <script src="/dev-public/bundle.js"></script>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('DEV SERVER - Listening from port', PORT);
});
