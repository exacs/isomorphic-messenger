/**
 * React Middleware for Express
 *
 * Responses with a HTML
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import createStore from 'store/configureStore';
import routes from 'routes';

export default (req, res) => {
  console.log('REACT router: %s %s %s', req.method, req.url, req.path);

  const sendContent = (body, state) => {
    res.send(`
      <!DOCTYPE html>
      <link rel=stylesheet href=/main.css>
      <title>An isomorphic application!!</title>
      <div id=root>${body}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
      <script src=/bundle.js></script>
    `);
  };

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log('error', error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      console.log('redirectLocation', redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const components = renderProps.components;
      const Comp = components[components.length - 1].WrappedComponent;
      const fetchData = (Comp && Comp.fetchData) || (() => Promise.resolve());
      const initialState = {};
      const store = createStore(initialState);
      const { location, params, history } = renderProps;

      fetchData({ store, location, params, history })
        .then(
          (action) => {
            console.log('action response', action);
            const body = renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            );
            console.log('satisfied');

            const state = store.getState();
            console.log('----- THE STATE ------');
            console.log(state);
            console.log('----------------------');
            sendContent(body, state);
          }
        );
    } else {
      console.log('Not found');
      res.status(404).send('Not found');
    }
  });
};
