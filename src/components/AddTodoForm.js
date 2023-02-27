import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css';
import PropTypes from 'prop-types';


const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const newTodoTitle = event.target.value;
            setTodoTitle(newTodoTitle);
        }
    };

    const handleAddTodo = (event) => {
        if (todoTitle === '') {
            event.preventDefault();
            setErrorMessage('Todo cannot be empty');
            return;
        }
        setErrorMessage('');
        event.preventDefault();
        onAddTodo({fields: {Title: todoTitle}, id: Date.now()});
        setTodoTitle('');
    };

    return (
        <form className={styles.TodoForm} onSubmit={handleAddTodo}>
            <InputWithLabel 
                todoTitle={todoTitle} 
                handleTitleChange={handleTitleChange}
                handleKeyDown={handleKeyDown}
            />
            <>{errorMessage}</>
        </form>
    );
};


AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
};


export default AddTodoForm;
