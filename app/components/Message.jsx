import React from 'react';
import styles from 'components/Message.scss';

export default ({ text }) => (
  <div className={ styles.root }>{ text }</div>
);
