import React from 'react';
import MessageList from 'components/MessageList';
import NewMessage from 'components/NewMessage';
import styles from 'components/Conversation.scss';

export default ({ messages }) => (
  <div className={ styles.root }>
    <div className={ styles.messageList }>
      <MessageList messages={messages} />
    </div>
    <div className={ styles.newMessage }>
      <NewMessage />
    </div>
  </div>
);
