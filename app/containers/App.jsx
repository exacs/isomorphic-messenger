import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from 'components/MessageList';

const mapStateToProps = (messages) => ({
  messages: messages
});

export default connect(mapStateToProps)(MessageList);
