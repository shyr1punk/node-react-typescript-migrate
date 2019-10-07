import React from 'react';

interface Props {
  addTask: (text: string) => void;
}

export default class Header extends React.Component<Props> {

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.addTask(event.currentTarget.value);
      event.currentTarget.value = '';
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
