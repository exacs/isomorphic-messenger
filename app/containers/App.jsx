import { connect } from 'react-redux';
import { sendMessage } from 'actions/index';
import Conversation from 'components/Conversation';
import { SENDING as REDUX_SENDING,
         SUCCESS as REDUX_SUCCESS,
         FAILURE as REDUX_FAILURE } from 'reducers/messages';
import { SENDING as REACT_SENDING,
         SUCCESS as REACT_SUCCESS,
         FAILURE as REACT_FAILURE } from 'components/Message';

// Maps from Redux message object to React message object
const mapMessageToMessage = message => {
  const statusMap = {
    [REDUX_SENDING]: REACT_SENDING,
    [REDUX_SUCCESS]: REACT_SUCCESS,
    [REDUX_FAILURE]: REACT_FAILURE,
  };
  return {
    status: statusMap[message.status],
    text: message.text,
  };
};

const mapStateToProps = ({ messages }) => ({
  messages: messages.map(mapMessageToMessage),
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: text => dispatch(sendMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
