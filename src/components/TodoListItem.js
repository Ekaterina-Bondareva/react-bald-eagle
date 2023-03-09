import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { ReactComponent as CheckedCheckboxIcon } from '../icons/checkedCheckbox.svg';
import { ReactComponent as EmptyCheckboxIcon } from '../icons/emptyCheckbox.svg';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';


const TodoListItem = ({item, onRemoveTodo, onCompletedCheck, editTodoItem}) => {

    const [completed, setCompleted] = useState(item.fields.Completed);

    const [editable, setEditable] = useState(false);

    const [inputValue, setInputValue] = useState(item.fields.Title);

    const [errorMessage, setErrorMessage] = useState('');

    const handleCompletedClick = () => {
        onCompletedCheck(item);
        setCompleted(!completed);
    }

    //Handle Delete and Edit using Dropdown
    const handleEditClick = () => {
        setEditable(true)
    };

    const handleDeleteClick = () => {
        onRemoveTodo(item.id);
    }

    const handleCancelClick = () => {
        setEditable(false);
        setErrorMessage('');
        setInputValue(item.fields.Title);
    }

    const handleSaveClick = () => {
        if (inputValue === '') {
            setErrorMessage('New value cannot be empty');//??????
        } else{
            item.fields.Title = inputValue;
            setEditable(false);
            setErrorMessage('');
            editTodoItem(item);
        }
    }

    const handleInputClick = (e) => {
        if (e.key === 'Enter') {
            handleSaveClick();
        } else if (e.key === 'Escape') {
            handleCancelClick();
        }
    }

    return (
        <>
            <div>
                {errorMessage !== '' ? (<p className={styles.Error} >{errorMessage}</p>) :(<p></p>)}
            </div>
            <li 
                className={styles.ListItem} 
                style={{textDecoration: completed ? "line-through" : "none"}}
            >
                <span>
                    <button 
                        className={styles.ListItemCheckbox} 
                        type="button"
                        onClick={handleCompletedClick}>
                        {
                            completed ?
                            (<CheckedCheckboxIcon className={styles.CheckedCheckbox} />) :
                            (<EmptyCheckboxIcon className={styles.EmptyCheckbox}/>) 
                        }
                    </button>
                    { !editable ? item.fields.Title : ''}    
                    {editable 
                        ? (<input 
                                type="text" 
                                className={styles.EditableInput}
                                autoFocus 
                                defaultValue={inputValue} 
                                onChange={(e) => {setInputValue(e.target.value)}} 
                                onKeyDown={handleInputClick} 
                            />) 
                        : (null)
                    }
                </span>
                <span>  
                    <button onClick={handleEditClick} className={styles.EditButton}><MdOutlineEdit className={styles.EditIcon} /></button>
                    <button onClick={handleDeleteClick} className={styles.DeleteButton}><MdOutlineDelete className={styles.DeleteIcon} /></button> 
                </span>
            </li>
        </>
    );
}


TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    onCompletedCheck: PropTypes.func,
    editTodoItem: PropTypes.func
};


export default TodoListItem;