import React,  {useRef, useEffect } from 'react';
import styles from './InputWithLabel.module.css';
import PropTypes from 'prop-types';
import { MdAdd } from "react-icons/md";


const InputWithLabel = ({todoTitle, handleTitleChange, handleKeyDown}) => {

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <div className={styles.TodoInputContainer}>
            <input 
                className={styles.TodoInput}
                ref={inputRef}
                type="text" 
                id="todoTitle" 
                name="title"
                placeholder="New Todo"
                value={todoTitle}
                onKeyDown={handleKeyDown}
                onChange={handleTitleChange}>
            </input>
            <button className={styles.TodoButton} type="submit">
                <MdAdd  className={styles.AddIcon}/>
            </button>
        </div>
    );
} 


InputWithLabel.propTypes = {
    handleTitleChange: PropTypes.func,
    handleKeyDown: PropTypes.func,
    todoTitle: PropTypes.string,
};


export default InputWithLabel;
