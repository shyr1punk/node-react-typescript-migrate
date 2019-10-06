import React from 'react';
import PropTypes from 'prop-types';

const FILTER_TITLES = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};

const Footer = ({
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
                {['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map(f =>
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

Footer.propTypes = {
    activeCount: PropTypes.number,
    completedCount: PropTypes.number,
    filter: PropTypes.string,
    onFilter: PropTypes.func,
    onClearCompleted: PropTypes.func
}

export default Footer;