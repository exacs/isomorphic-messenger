import React from 'react';
import Message from 'components/Message';
import styles from 'components/MessageList.scss';

export default ({ messages }) => (
  <ul className={ styles.root }>
    {
      Object.keys(messages).map(key => {
        const item = messages[key];
        return (
          <li className={ styles.item } key={ key }>
            <Message text={ item.text } status={ item.status } />
          </li>
        );
      })
    }
  </ul>
);
