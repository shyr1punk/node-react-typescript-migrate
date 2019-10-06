import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

export default class TodoList extends React.Component {

  static propTypes = {
    dataSource: PropTypes.array,
    onDestroyTask: PropTypes.func,
    onEditTask: PropTypes.func,
    onToggleTask: PropTypes.func,
    onToggleAll: PropTypes.func
  };

  handleToggle = (event) => {
    this.props.onToggleAll(event.target.checked);
  };

  renderToggleAll() {
    const completedCount = this.props.dataSource.reduce((count, task) => task.completed ? count + 1 : count, 0);

    if (this.props.dataSource.length) {
      return (
        <input
          type="checkbox"
          className="toggle-all"
          checked={completedCount === this.props.dataSource.length}
          onClick={this.handleToggle}
        />
      );
    }
  }

  render() {
    return (
      <section className="main">
        {this.renderToggleAll()}
        <ul className="todo-list">
          {
            this.props.dataSource.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  data={item}
                  onDestroyTask={this.props.onDestroyTask}
                  onEditTask={this.props.onEditTask}
                  onToggleTask={this.props.onToggleTask}
                />
              );
            })
          }
        </ul>
      </section>
    );
  }

}
