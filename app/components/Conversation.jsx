import React from 'react';
import MessageList from 'components/MessageList';
import NewMessage from 'components/NewMessage';

export default ({ messages }) => (
  <div>
    <MessageList messages={messages} />
    <NewMessage />
  </div>
);
