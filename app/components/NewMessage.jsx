import React from 'react';
import styles from 'components/NewMessage.scss';

export default () => (
  <form className={ styles.container }>
    <input className={ styles.input } type="text" />
    <input className={ styles.submit } type="submit" name="submit" value="OK" />
  </form>
);
