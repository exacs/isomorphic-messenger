import { connect } from 'react-redux';
import Conversation from 'components/Conversation';

const mapStateToProps = (messages) => ({
  messages: Object.getOwnPropertySymbols(messages).map(
    key => messages[key]
  ),
});

export default connect(mapStateToProps)(Conversation);
