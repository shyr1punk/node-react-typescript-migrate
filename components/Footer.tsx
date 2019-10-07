import React from 'react';

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

export type Filter = keyof typeof FILTER_TITLES;

export interface FooterProps {
  activeCount: number;
  completedCount: number;
  filter: string;
  onFilter: (filter: Filter) => void;
  onClearCompleted: () => void;
}

export default class Footer extends React.Component<FooterProps> {

  renderFilterLink(filter: Filter) {
    const selectedClass = filter === this.props.filter ? 'selected' : '';

    return (
      <a className={selectedClass} onClick={() => this.props.onFilter(filter)} style={{cursor: 'pointer'}}>
        {FILTER_TITLES[filter]}
      </a>
    );
  }

  renderClearButton() {
    if (this.props.completedCount) {
      return (
        <button className="clear-completed" onClick={() => this.props.onClearCompleted()}>
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.activeCount}</strong> item left
        </span>
        <ul className="filters">
          {(['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'] as Filter[]).map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }

}
