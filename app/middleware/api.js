/**
 * API Middleware for Redux
 *
 * Based on
 * https://github.com/reactjs/redux/blob/master/examples/real-world/middleware/api.js
 */
import 'isomorphic-fetch';

const API_ROOT = process.env.API_ROOT || '/api';

const callApi = (endpoint, method, data) => {
  const fullUrl = API_ROOT + endpoint;
  const requestObj = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(fullUrl, requestObj)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
      });
    });
};

//
// Public
//
export const CALL_API = Symbol('Call API');

// The Middleware
export default () => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, actionTypes, method, data } = callAPI;

  const actionWith = (extra) => {
    const finalAction = Object.assign({}, action, extra);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = actionTypes;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, method, data)
    .then(response => next(actionWith({
      response,
      type: successType,
    })))
    .catch(error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    })));
};
