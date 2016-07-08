import { connect } from 'react-redux';
import { sendMessage } from 'actions/index';
import Conversation from 'components/Conversation';

const mapStateToProps = (messages) => ({
  messages: Object.keys(messages).map(
    key => messages[key]
  ),
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: text => dispatch(sendMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
