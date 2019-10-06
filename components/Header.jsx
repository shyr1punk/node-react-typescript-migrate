import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {

  static propTypes = {
    addTask: PropTypes.func
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.addTask(event.target.value);
      event.target.value = '';
    }
  };

  render() {
    return (
      <header>
        <h1>todo</h1>
        <input
          type="text"
          className="new-todo"
          onKeyDown={this.handleKeyDown}
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }

}
