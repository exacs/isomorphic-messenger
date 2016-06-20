import React from 'react';
import MessageList from 'components/MessageList';

const array = [
  'Message 1',
  'Message 2'
];

export default () => (
  <MessageList messages={array} />
);
