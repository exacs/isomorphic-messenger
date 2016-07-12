import React from 'react';
import styles from 'components/Message.scss';

export const SENDING = 'SENDING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export default ({ status, text }) => {
  // Map reducers status with styles status
  const map = {
    [SENDING]: styles.statusSending,
    [SUCCESS]: styles.statusSuccess,
    [FAILURE]: styles.statusFailure,
  };
  const classes = [
    styles.root,
    map[status] || styles.statusSending,
  ];
  return (
    <div className={ classes.join(' ') }>{ text }</div>
  );
};
