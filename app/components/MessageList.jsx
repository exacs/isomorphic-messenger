import React from 'react';
import Message from 'components/Message';

export default ({ messages }) => (
  <ul className="message-list">
    {
      messages.map((item, i) => (
        <li className="message-list__item">
          <Message text={item} key={i} />
        </li>
      ))
    }
  </ul>
);
