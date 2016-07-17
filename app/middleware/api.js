/**
 * API Middleware for Redux
 *
 * Based on
 * https://github.com/reactjs/redux/blob/master/examples/real-world/middleware/api.js
 *
 * () :: (object :: NextMiddlewareType) :: object :: Promise|NextMiddlewareType
 *
 * Performs a GET or POST request to a server.
 *
 * @param next {Action :: NextMiddlewareType} - The next middleware of the chain
 *
 * @param action {object} - an object representing a Redux action
 * - relevant only if CALL_API key is present:
 *
 * @param action[CALL_API] {object} if present, must have the following fields:
 * - endpoint {string}   - the endpoint for the API call
 * - method {string}     - "GET" or "POST"
 * - data {object|array} - body of the message to be sent in the request
 * - actionTypes {array} - length 3 array of Redux synchronous actions to be dispatched
 *   - [0] - Inmediatelly
 *   - [1] - When a successful response is given by the server
 *   - [2] - When a not successful response is given by the server
 *
 * @return {Promise<NextMiddlewareType> | NextMiddlewareType}
 * - if @param action[CALL_API] is present, returns a Promise:
 *   - Fulfilled when a response is received from the server
 *     with next(action[actionTypes][1]) if successful
 *     with next(action[actionTypes][2]) if not successful
 *
 * - otherwise, returns next(action)
 *
 */
import 'isomorphic-fetch';

const API_ROOT = process.env.API_HOST
               ? `${process.env.API_HOST}:${process.env.PORT || 3000}/api`
               : '/api';

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
