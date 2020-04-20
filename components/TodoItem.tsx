import React from 'react';

export interface TodoItemProps {
    data: Task;
    onDestroyTask(id: string): void;
    onEditTask(id: string, name: string): void;
    onToggleTask(id: string): void;
}

interface TodoItemState {
    editing: boolean;
    editText: string;
}

export default class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    state: TodoItemState = {
        editing: false,
        editText: this.props.data.name
    };

    handleEdit = () => {
        this.setState({ editing: true });
    };

    handleSubmit = () => {
        var val = this.state.editText.trim();
        if (val) {
            this.setState({ editing: false, editText: val });
            this.props.onEditTask(this.props.data.id, val);
        } else {
            this.props.onDestroyTask(this.props.data.id);
        }
    };

    handleToggle = () => {
        this.props.onToggleTask(this.props.data.id);
    };

    handleDestroy = () => {
        this.props.onDestroyTask(this.props.data.id);
    };

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 27) {
            this.setState({ editing: false, editText: this.props.data.name });
        } else if (event.which === 13) {
            this.handleSubmit();
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ editText: event.target.value });
    };

    render() {
        let className = '';
        if (this.props.data.completed) { className += ' completed' }
        if (this.state.editing) { className += ' editing' }

        return (
            <li className={className}>
                <div className="view">
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={this.props.data.completed}
                        onChange={this.handleToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>{this.props.data.name}</label>
                    <button className="destroy" onClick={this.handleDestroy} />
                </div>
                <input
                    type="text"
                    className="edit"
                    value={this.state.editText}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
}
