import React from 'react';
import Message from 'components/Message';

export default ({ messages }) => (
  <ul>
    {
      messages.map((item, i) => (
        <Message text={item} key={i} />
      ))
    }
  </ul>
);
