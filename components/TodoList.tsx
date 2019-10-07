import React from 'react';

import TodoItem, { Data, TodoItemProps } from './TodoItem';


type TodoItemCallbacks = Pick<TodoItemProps, 'onDestroyTask' | 'onEditTask' | 'onToggleTask'>

interface Props extends TodoItemCallbacks {
  dataSource: Data[];
  onToggleAll: (checked:  boolean) => void;
}

export default class TodoList extends React.Component<Props> {

  handleToggle = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    this.props.onToggleAll(event.currentTarget.checked);
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
