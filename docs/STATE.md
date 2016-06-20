# The State
Any non-trivial application needs state handling. However, state handling is
very different on client than the same on server.

For convenience, I've chosen a one-way data-flow architecture and Redux as its
implementation.

In our Messenger App, the state will be an array of messages (strings). Remember
that the state handling is not the same on server and on client. On server, we
only have to create the initial state and render the components following that
state. On client, we have to add some actions to allow users to mutate the
state.

Here I will use terms of the Redux library, so you need to be familiar with its
terminology.

Let's begin with the Server-side state.

We need:

- A reducer that doesn't do anything
- A store with that reducer that accepts an initial state.
- An initial state.

Let's go:

## Server side

##### `app/server/index.js`

```javascript
import { createStore } from 'redux';


const initialState = [];
const reducer = (state = initialState) => state;
const store = createStore(reducer, initialState);
```

Now, we have to connect it to our React-based UI. To do that we need:

- The `Provider` high order component.
- A *smart* component.
- Some *dumb* components.

Let's begin with the dumb components. For rendering a list of texts.

##### `app/components/Message.jsx`

```javascript
import React from 'react';

export default ({ text }) => (
  <li>{ text }</li>
);
```

##### `app/components/MessageList.jsx`

```javascript
import React from 'react';
import Message from 'components/Message';

export default ({ messages }) => (
  <ul>
    {
      messages.map((item, i) => (
        <Message text={item} key={i} />
      ))
    }
  </ul>
);
```

Then we need a *smart* component, that links the store (an array of strings)
with the `MessageList` component (passing the store-array as component props)

##### `app/containers/App.jsx`

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from 'components/MessageList';

const mapStateToProps = (messages) => ({
  messages: messages
});

export default connect(mapStateToProps)(MessageList);
```

Finally we need the root component with the Provider on top

##### `app/containers/Root.jsx`

```javascript
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}
```

Finally we have to change our `server/index.js` to render the new `Root` component:

```javascript
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
```

## Client side and shared code

Almost all of the code of what we've created can be shared between client and
server. So, let's separate it into several files so we can use it as setup

##### `app/reducers/index.js`

```javascript
const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  return state;
}
```

##### `app/store/configureStore.js`

```javascript
import { createStore } from 'redux';
import reducer from 'reducers/index';

export default (preloadedState) => (
  createStore(reducer, preloadedState)
);
```

Now, to try the client-side state handling, we need to create some actions.

##### `app/actions/index.js`

```javascript
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = text => ({
  type: ADD_MESSAGE,
  text
});
```

On server-side, let's change the initial state a bit, to be an array of three
elements.

Also let's include a `script` tag to pass that state to the client side via a
global variable.

##### `server/index.js`

```javascript
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
  `);
});

export default app;
```

Now, on client-side we are going to take that state and execute some actions

##### `client/index.js`

```javascript
import React from 'react';
import { render } from 'react-dom';

import Root from 'containers/Root';
import createStore from 'store/configureStore';
import { addMessage } from 'actions/index';

const store = createStore(window.__INITIAL_STATE__);

render(
  <Root store={store} />, document.getElementById('root')
);

store.dispatch(addMessage('4 from client'));
```
