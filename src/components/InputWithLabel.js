import React from "react";

import styles from './InputWithLabel.module.css';

import PropTypes from 'prop-types';


function InputWithLabel (props) {

    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <label className={styles.TodoLabel} htmlFor="todoTitle">{props.children}</label>
            <input 
                className={styles.TodoInput}
                ref={inputRef}
                type="text" 
                id="todoTitle" 
                name="title"
                value={props.todoTitle}
                onChange={props.handleTitleChange}>
            </input>
            <button className={styles.TodoButton} type="submit">Add</button>
        </>
    );
} 

InputWithLabel.propTypes = {
    handleTitleChange: PropTypes.func
};


export default InputWithLabel;