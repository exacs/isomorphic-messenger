import React, { Component } from 'react';
import styles from 'components/NewMessage.scss';

export default class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  }
  render() {
    return (
      <form className={ styles.container }
            action="/messages"
            method="post"
            onSubmit={ this.handleSubmit }>
        <input className={ styles.input }
               name="text"
               type="text"
               value={ this.state.value }
               onChange={ this.handleChange }
               placeholder="Write your message..." />
        <input className={ styles.submit }
               type="submit"
               name="submit"
               value="OK" />
      </form>
    );
  }
}
