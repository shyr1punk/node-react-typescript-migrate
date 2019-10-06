import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ addTask }) => {
    const handleKeyDown = React.useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            addTask(event.target.value);
            event.target.value = '';
        }
    }, [addTask]);

    return (
        <header>
            <h1>todo</h1>
            <input
                type="text"
                className="new-todo"
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
                autoFocus
            />
        </header>
    );
}

Header.propTypes = {
    addTask: PropTypes.func.isRequired
};

export default Header;