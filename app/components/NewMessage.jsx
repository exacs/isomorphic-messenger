import React from 'react';
import styles from 'components/NewMessage.scss';

export default () => (
  <form className={ styles.container } action="/messages" method="post">
    <input className={ styles.input } name="text" type="text" placeholder="Write your message..." />
    <input className={ styles.submit } type="submit" name="submit" value="OK" />
  </form>
);
