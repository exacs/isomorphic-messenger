import React, { PropTypes } from 'react';
import ChatListItem from 'components/ChatListItem';

const ChatList = ({ chats }) => (
  <ul>
    {
      chats.map(({ title, link }, key) => (
        <li key={ key }>
          <ChatListItem link={ link } title={ title } />
        </li>
      ))
    }
  </ul>
);

ChatList.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default ChatList;
