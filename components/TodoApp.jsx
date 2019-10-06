import React from 'react';

import Utils from '../utils/utils';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import API from '../api/database';

const TODO_FILTER = {
    'SHOW_ALL': () => true,
    'SHOW_ACTIVE': task => !task.completed,
    'SHOW_COMPLETED': task => task.completed
};

export default class TodoApp extends React.Component {
    state = {
        tasks: [],
        filter: 'SHOW_ALL'
    };

    componentDidMount() {
        API.fetchTasks().then(tasks => {
            this.setState({
                tasks
            })
        })
    }

    handleAddTask = (value) => {
        const newTask = {
            id: Utils.generateId(),
            name: value,
            completed: false
        };

        API.saveTask(newTask)

        this.setState({
            tasks: this.state.tasks.concat(newTask)
        });
    };

    handleEditTask = (id, name) => {
        let newTasks = this.state.tasks.map((task) => {
            if (id == task.id) {
                task.name = name;

                API.updateTask(id, {
                    name: task.name,
                })
            }

            return task;
        });

        this.setState({ tasks: newTasks });
    };

    handleDestroyTask = (id) => {
        API.deleteTask(id);

        let newTasks = this.state.tasks.filter((task) => id != task.id);

        this.setState({ tasks: newTasks });
    };

    handleToggle = (id) => {
        let newTasks = this.state.tasks.map((task) => {
            if (id == task.id) {
                task.completed = !task.completed;

                API.updateTask(id, {
                    completed: task.completed
                });
            }

            return task;
        });

        this.setState({ tasks: newTasks });
    };

    handleToggleAll = (status) => {
        let newTasks = this.state.tasks.map((task) => {
            task.completed = status;

            return task;
        });

        this.setState({ tasks: newTasks });
    };

    handleFilter = (filter) => {
        this.setState({ filter });
    };

    handleClearCompleted = () => {
        let newTasks = this.state.tasks.filter((task) => {
            if (task.completed) {
                API.deleteTask();

                return false;
            } else {
                return true;
            }
        });

        this.setState({ tasks: newTasks });
    };

    renderFooter(completedCount) {
        const activeCount = this.state.tasks.length - completedCount;

        if (this.state.tasks.length) {
            return (
                <Footer
                    filter={this.state.filter}
                    activeCount={activeCount}
                    completedCount={completedCount}
                    onFilter={this.handleFilter}
                    onClearCompleted={this.handleClearCompleted}
                />
            );
        }
    }

    render() {
        const filterTasks = this.state.tasks.filter(TODO_FILTER[this.state.filter]);
        const completedCount = this.state.tasks.reduce((count, task) => task.completed ? count + 1 : count, 0);

        return (
            <div>
                <Header addTask={this.handleAddTask} />
                <TodoList
                    dataSource={filterTasks}
                    onDestroyTask={this.handleDestroyTask}
                    onEditTask={this.handleEditTask}
                    onToggleTask={this.handleToggle}
                    onToggleAll={this.handleToggleAll}
                />
                {this.renderFooter(completedCount)}
            </div>
        );
    }
}
