import React from 'react';
import styles from 'components/NewMessage.scss';

export default () => (
  <form className={ styles.root }>
    <textarea className={ styles.input } />
    <input className={ styles.submit } type="submit" name="submit" value="OK" />
  </form>
);
