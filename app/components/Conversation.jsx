import React from 'react';
import styles from 'components/Conversation.scss';

import MessageList from 'components/MessageList';
import NewMessage from 'components/NewMessage';

export default ({ messages, sendMessage }) => (
  <div className={ styles.container }>
    <header className={ styles.header }>
      Messages
    </header>
    <main className={ styles.body }>
      <MessageList messages={messages} />
    </main>
    <footer className={ styles.footer }>
      <NewMessage onSubmit={ sendMessage } />
    </footer>
  </div>
);
