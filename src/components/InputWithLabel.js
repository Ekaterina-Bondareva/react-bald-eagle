import React, {useRef, useEffect} from 'react';
import styles from './InputWithLabel.module.css';
import PropTypes from 'prop-types';


const InputWithLabel = ({todoTitle, handleTitleChange, handleKeyDown, children}) => {

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            {/* <label className={styles.TodoLabel} htmlFor="todoTitle">{children}</label> */}
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
            <button className={styles.TodoButton} type="submit">Add</button>
        </>
    );
} 


InputWithLabel.propTypes = {
    handleTitleChange: PropTypes.func,
    handleKeyDown: PropTypes.func,
    todoTitle: PropTypes.string,
    children: PropTypes.string
};


export default InputWithLabel;
