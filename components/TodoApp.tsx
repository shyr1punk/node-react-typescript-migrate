import React from 'react';

import Utils from '../utils/utils';

import Header from './Header';
import TodoList from './TodoList';
import Footer, { Filter } from './Footer';
import API from '../api/database';

const TODO_FILTER = {
    'SHOW_ALL': () => true,
    'SHOW_ACTIVE': (task: Task) => !task.completed,
    'SHOW_COMPLETED': (task: Task) => task.completed
};

interface TodoAppState {
    tasks: Task[];
    filter: Filter;
}

export default class TodoApp extends React.Component<{}, TodoAppState> {
    state: TodoAppState = {
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

    handleAddTask = (value: string) => {
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

    handleEditTask = (id: string, name: string) => {
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

    handleDestroyTask = (id: string) => {
        API.deleteTask(id);

        let newTasks = this.state.tasks.filter((task) => id != task.id);

        this.setState({ tasks: newTasks });
    };

    handleToggle = (id: string) => {
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

    handleToggleAll = (status: boolean) => {
        let newTasks = this.state.tasks.map((task) => {
            task.completed = status;

            return task;
        });

        this.setState({ tasks: newTasks });
    };

    handleFilter = (filter: Filter) => {
        this.setState({ filter });
    };

    handleClearCompleted = () => {
        let newTasks = this.state.tasks.filter((task) => {
            if (task.completed) {
                API.deleteTask(task.id);

                return false;
            } else {
                return true;
            }
        });

        this.setState({ tasks: newTasks });
    };

    renderFooter(completedCount: number) {
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
