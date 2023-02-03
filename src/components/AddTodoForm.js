import React from "react";

import InputWithLabel from "./InputWithLabel";

import styles from './AddTodoForm.module.css';

import PropTypes from 'prop-types';


function AddTodoForm(props) {

    const [todoTitle, setTodoTitle] = React.useState('');

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        props.onAddTodo({fields: {Title: todoTitle}, id: Date.now()});
        setTodoTitle('');
    }

    return (
        <form className={styles.TodoForm} onSubmit={handleAddTodo}>
            <InputWithLabel 
                todoTitle={todoTitle} 
                handleTitleChange={handleTitleChange}
            >
                Title:  
            </InputWithLabel>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
};


export default AddTodoForm;
