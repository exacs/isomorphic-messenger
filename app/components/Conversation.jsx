import React from 'react';
import MessageList from 'components/MessageList';
import NewMessage from 'components/NewMessage';
import styles from 'components/Conversation.scss';

export default ({ messages }) => (
  <div className={ styles.container }>
    <header className={ styles.header }>
      Messages
    </header>
    <main className={ styles.body }>
      <MessageList messages={messages} />
    </main>
    <footer className={ styles.footer }>
      <NewMessage />
    </footer>
  </div>
);
