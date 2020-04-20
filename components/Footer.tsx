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
    filter: Filter;
    onFilter(filter: Filter): void;
    onClearCompleted(): void;
}

const Footer: React.FC<FooterProps> = ({
    activeCount,
    completedCount,
    filter,
    onFilter,
    onClearCompleted,
}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> item left
            </span>
            <ul className="filters">
                {(['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'] as Filter[]).map(f =>
                    <li key={f}>
                        <a
                            className={f === filter ? 'selected' : ''}
                            onClick={() => onFilter(f)}
                            style={{ cursor: 'pointer' }}
                        >
                            {FILTER_TITLES[f]}
                        </a>
                    </li>
                )}
            </ul>
            {completedCount ? (
                <button className="clear-completed" onClick={() => onClearCompleted()}>
                    Clear completed
                </button>
            ) : null}
        </footer>
    );
}

export default Footer;