import React, { PropTypes } from 'react';

const ChatListItem = ({ title, link }) => (
  <div>
    <a href={ link }>{ title }</a>
  </div>
);

ChatListItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ChatListItem;
