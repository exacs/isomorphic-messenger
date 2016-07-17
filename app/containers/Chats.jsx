import React, { PropTypes } from 'react';
import ChatList from 'components/ChatList';

const Chats = ({ chats, children }) => (
  <div>
    <aside>
      <ChatList chats={ chats } />
    </aside>
    <main>
      { children }
    </main>
  </div>
);

Chats.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),

  children: PropTypes.element,
};

export default Chats;
