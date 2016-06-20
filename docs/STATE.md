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
