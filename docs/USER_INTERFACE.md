# User Interface
For User Interfaces, I choose React. Probably the main reason for it, is the
possibility of render the same code by the server or by the client.

Let's begin.

To start, we have created two React components: `HelloClient` and `HelloServer`.
Both are just "Hello World" components like this one:

##### `app/components/HelloClient.jsx`

```javascript
import React from 'react';

export default () => (
  <div>Hello Client</div>
);
```

Our goal for this chapter is to render both components.

## Server-side Rendering
The server has to render a HTML-like "template" with a React component, and
some links pointing the client JS and CSS.

This is the code of the server.

##### `server/index.js`

```javascript
import express from 'express';
import HelloServer from 'components/HelloServer';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = express();
app.use((req, res) => {
  res.send(`
    <!DOCTYPE html>
    <title>An isomorphic application!!</title>
    <div id=root>${renderToString(<HelloServer />)}</div>
  `);
});

export default app;
```

As you can see, we are just importing the component and calling the
`renderToString` function of React.

Notice that our HTML are just three lines: the doctype declaration, the title,
and a div. All other tags (`html`, `head`, `body`) are optional since HTML5.

Let's run the example

```
npm run build
npm run start
```

And go to `localhost:3001`. You will see the "Hello Server text". You can also
open the developer tools of your browser to check that, in fact, there is a
React component.

## Client-side rendering

Now, it's time to render the second component from client. This is the
JavaScript code:

```
import HelloClient from 'components/HelloClient';
import React from 'react';
import { render } from 'react-dom';

render(
  <HelloClient />, document.getElementById('root')
);
```

Notice that we are using the `#root` element to render this new component,
meaning that `HelloClient` will override the component rendered by the server.

## Client-side bundle

Now, we need to create a JS bundle for the client (for the browser). To do that,
we are using webpack.

First, install `webpack` and `babel-loader` (`npm install --save-dev`)

Then configure it

##### `webpack.config.js`

```javascript
const path    = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',

  output: {
    path:     path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }
    ]
  }
}
```

And let's add some `build-client` script in package.json:

```
"build-client": "NODE_ENV=production webpack --progress --color -p",
```

Finally we have to allow people to access the `public` directory and load the
bundle from the HTML markup. So:

##### `server/index.js`

```javascript
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
```

Now, if you execute all and start the server you have to see the "Hello Client"
component instead of "Hello Server"


## Summary

In this chapter, we have learned to:

1. Use React in Client and Server side
2. Create a production workflow

Now, the next steps could be:

1. Solve the routing problem in client and server side
2. Render a stateful component
3. Add interactivity
