import React from 'react';
import { Route } from 'react-router';
import Chats from 'containers/Chats';
import Chat from 'containers/Chat';

export default (
  <Route path="/chats" component={Chats}>
    <Route path="/chats/:chat_id" component={Chat} />
  </Route>
);
