import React from 'react';

export interface HeaderProps {
    addTask(name: string): void;
}

const Header: React.FC<HeaderProps> = ({ addTask }) => {
    const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            addTask(event.currentTarget.value);
            event.currentTarget.value = '';
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

export default Header;