import { connect } from 'react-redux';
import { sendMessage } from 'actions/index';
import Chat from 'components/Chat';
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
  messages: Object.keys(messages).map(key => mapMessageToMessage(messages[key])),
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: text => dispatch(sendMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
