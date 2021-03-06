import React, { PropTypes } from 'react';
import styles from 'components/Conversation.scss';
import MessageList from 'components/MessageList';
import NewMessage from 'components/NewMessage';

import { connect } from 'react-redux';
import { sendMessage,
         fetchMessages } from 'actions/index';
import { SENDING as REDUX_SENDING,
         SUCCESS as REDUX_SUCCESS,
         FAILURE as REDUX_FAILURE } from 'reducers/messages';
import { SENDING as REACT_SENDING,
         SUCCESS as REACT_SUCCESS,
         FAILURE as REACT_FAILURE } from 'components/Message';

class Chat extends React.Component {
  componentDidMount() {
    if (this.props.messages.length === 0) {
      this.props.fetchMessages();
    }
  }
  render() {
    const { messages, submitMessage } = this.props;
    return (
      <div className={ styles.container }>
        <header className={ styles.header }>
          Messages
        </header>
        <main className={ styles.body }>
          <MessageList messages={messages} />
        </main>
        <footer className={ styles.footer }>
          <NewMessage onSubmit={ submitMessage } />
        </footer>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  submitMessage: PropTypes.func,
  fetchMessages: PropTypes.func,
};

Chat.fetchData = ({ store }) => store.dispatch(fetchMessages());

const mapMessageToMessage = message => {
  const statusMap = {
    [REDUX_SENDING]: REACT_SENDING,
    [REDUX_SUCCESS]: REACT_SUCCESS,
    [REDUX_FAILURE]: REACT_FAILURE,
  };

  return {
    status: statusMap[message.status],
    text: message.text,
    date: message.creationDate,
  };
};

const mapStateToProps = ({ messages }) => ({
  messages: Object.keys(messages).map(key => mapMessageToMessage(messages[key])),
});

const mapDispatchToProps = (dispatch) => ({
  submitMessage: text => dispatch(sendMessage(text)),
  fetchMessages: () => dispatch(fetchMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
