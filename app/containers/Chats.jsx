import React, { PropTypes } from 'react';
import ChatList from 'components/ChatList';
import styles from 'components/Chats.scss';

import { connect } from 'react-redux';
import { fetchChats } from 'actions/index';

class Chats extends React.Component {
  componentDidMount() {
    if (this.props.chats.length === 0) {
      this.props.fetchChats();
    }
  }
  render() {
    const { chats, children } = this.props;
    return (
      <div className={ styles.container }>
        <aside className={ children ? styles.sidebar : '' }>
          <ChatList chats={ chats } />
        </aside>
        <main className={ styles.main }>
          { children }
        </main>
      </div>
    );
  }
}

Chats.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.element,
  fetchChats: PropTypes.func,
};

Chats.fetchData = ({ store }) => store.dispatch(fetchChats());

const mapChatToChat = chat => ({
  title: chat.title,
  link: `/chats/${chat.id}`,
});

const mapStateToProps = ({ chats }) => ({
  chats: Object.keys(chats).map(key => mapChatToChat(chats[key])),
});

const mapDispatchToProps = dispatch => ({
  fetchChats: () => dispatch(fetchChats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
