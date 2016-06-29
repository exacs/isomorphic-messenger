import React, { Component } from 'react';
import { connect } from 'react-redux';
import Conversation from 'components/Conversation';

const mapStateToProps = (messages) => ({
  messages: messages
});

export default connect(mapStateToProps)(Conversation);
