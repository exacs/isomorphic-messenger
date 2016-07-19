import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from 'components/ChatListItem.scss';


const ChatListItem = ({ title, link }) => (
  <Link className={ styles.container } to={ link }>{ title }</Link>
);

ChatListItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ChatListItem;
