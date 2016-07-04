import { connect } from 'react-redux';
import { CALL_API } from 'middleware/api';
import { SEND_MESSAGE_REQUEST,
         SEND_MESSAGE_SUCCESS,
         SEND_MESSAGE_FAILURE } from 'actions/index';
import Conversation from 'components/Conversation';

let NEXT_CLIENT_ID = 0;

const mapStateToProps = (messages) => ({
  messages: Object.keys(messages).map(
    key => messages[key]
  ),
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: text => dispatch({
    [CALL_API]: {
      endpoint: '/messages',
      actionTypes: [
        SEND_MESSAGE_REQUEST,
        SEND_MESSAGE_SUCCESS,
        SEND_MESSAGE_FAILURE,
      ],
      method: 'POST',
      data: { text },
    },

    key: 'key' + (NEXT_CLIENT_ID++),
    id: 1,
    text,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
