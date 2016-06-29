import React from 'react';
import Message from 'components/Message';
import styles from 'components/MessageList.scss';

export default ({ messages }) => (
  <ul className={ styles.root }>
    {
      messages.map((item, i) => (
        <li className={ styles.item }>
          <Message text={item} key={i} />
        </li>
      ))
    }
  </ul>
);
