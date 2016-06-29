import React from 'react';
import MessageList from 'components/MessageList';
import NewMessage from 'components/NewMessage';

export default ({ messages }) => (
  <div className="conversation">
    <div className="conversation__message-list">
      <MessageList messages={messages} />
    </div>
    <div className="conversation__new-message">
      <NewMessage />
    </div>
  </div>
);
