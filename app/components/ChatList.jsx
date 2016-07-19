import React, { PropTypes } from 'react';
import ChatListItem from 'components/ChatListItem';
import styles from 'components/ChatList.scss';

const ChatList = ({ chats }) => (
  <ul className={ styles.list }>
    {
      chats.map(({ title, link }, key) => (
        <li className={ styles.item } key={ key }>
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
