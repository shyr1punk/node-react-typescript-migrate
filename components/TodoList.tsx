import React from 'react';

import TodoItem from './TodoItem';

export interface TodoListProps {
    dataSource: Task[];
    onDestroyTask(id: string): void;
    onEditTask(id: string, name: string): void;
    onToggleTask(id: string): void;
    onToggleAll(checked: boolean): void;
}

export default class TodoList extends React.Component<TodoListProps> {
    handleToggle = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        this.props.onToggleAll(event.currentTarget.checked);
    };

    render() {
        const completedCount = this.props.dataSource.reduce((count, task) => task.completed ? count + 1 : count, 0);

        return (
            <section className="main">
                {this.props.dataSource.length ? (
                    <input
                        type="checkbox"
                        className="toggle-all"
                        checked={completedCount === this.props.dataSource.length}
                        onClick={this.handleToggle}
                    />
                ) : null}
                <ul className="todo-list">
                    {this.props.dataSource.map((item) => (
                        <TodoItem
                            key={item.id}
                            data={item}
                            onDestroyTask={this.props.onDestroyTask}
                            onEditTask={this.props.onEditTask}
                            onToggleTask={this.props.onToggleTask}
                        />
                    ))}
                </ul>
            </section>
        );
    }
}
