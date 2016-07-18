import React, { PropTypes } from 'react';
import ChatList from 'components/ChatList';

import { connect } from 'react-redux';
import { fetchChats } from 'actions/index';

const Chats = ({ chats, children }) => (
  <div className="root">
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

Chats.fetchData = ({ store }) => store.dispatch(fetchChats());

const mapChatToChat = chat => ({
  title: chat.title,
  link: `/chats/${chat.id}`,
});

const mapStateToProps = ({ chats }) => ({
  chats: Object.keys(chats).map(key => mapChatToChat(chats[key])),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
