import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const ChatListItem = ({ title, link }) => (
  <div>
    <Link to={ link }>{ title }</Link>
  </div>
);

ChatListItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ChatListItem;
