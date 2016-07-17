import React, { PropTypes } from 'react';
import ChatList from 'components/ChatList';

import { connect } from 'react-redux';

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

const mapChatToChat = chat => ({
  title: chat.title,
  link: `/chats/${chat.id}`,
});

const mapStateToProps = ({ chats }) => ({
  chats: Object.keys(chats).map(key => mapChatToChat(chats[key])),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
