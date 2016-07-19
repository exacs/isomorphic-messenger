import React from 'react';
import styles from 'components/Message.scss';
import moment from 'moment';

export const SENDING = 'SENDING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function Message({ status, text, date }) {
  // Map reducers status with styles status
  const map = {
    [SENDING]: styles.statusSending,
    [SUCCESS]: styles.statusSuccess,
    [FAILURE]: styles.statusFailure,
  };
  const rootClasses = [
    styles.root,
    map[status] || styles.statusSending,
  ];

  return (
    <div className={ rootClasses.join(' ') }>
      <div className={ styles.text } >{ text }</div>
      <small className={ styles.date }>{ moment.unix(date).format('HH:mm') }</small>
    </div>
  );
}

Message.propTypes = {
  status: React.PropTypes.oneOf([SENDING, SUCCESS, FAILURE]),
  text: React.PropTypes.string,
  date: React.PropTypes.number,
};

export default Message;
