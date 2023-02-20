import React, {useState} from 'react';
import styles from './TodoListItem.module.css';
import { ReactComponent as TrashIcon } from '../trash.svg';
import { ReactComponent as EmptyCheckbox } from '../empty-checkbox.svg';
import { ReactComponent as CheckedCheckbox } from '../checked-checkbox.svg';
import PropTypes from 'prop-types';


const TodoListItem = ({item, onRemoveTodo, onCompletedCheck, editTodoItem}) => {

    const [completed, setCompleted] = useState(item.fields.Completed);

    const [editable, setEditable] = useState(false);

    const [inputValue, setInputValue] = useState(item.fields.Title);

    const [errorMessage, setErrorMessage] = useState('');

    const handleCompletedClick = () => {
        onCompletedCheck(item);
        setCompleted(!completed);
    }

    const handleEditClick = () => setEditable(true);

    const handleCancelClick = () => {
        setEditable(false);
        setErrorMessage('');
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

    return (
        <li className={styles.ListItem}>
            <div>
                {errorMessage !== '' ? (<p className={styles.Error} >{errorMessage}</p>) :(<p></p>)}
            </div>
            <button 
                className={styles.ListItemCheckbox} 
                type="button"
                onClick={handleCompletedClick}>
                {
                    completed ? (<CheckedCheckbox height='20px' width='20px' />) :
                    (<EmptyCheckbox height='20px' width='20px' />) 
                }
            </button>
            {!editable ? item.fields.Title : ''}    
            {editable 
                ? (<><input type="text" autoFocus defaultValue={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/> <input type="button" value="Cancel" onClick={handleCancelClick}/><input type="button" value="Save" onClick={handleSaveClick}/></>) 
                : (<input type="button" value="Edit" onClick={handleEditClick}/>)}       
            <button 
                className={styles.ListItemTrashIcon} 
                type="button" 
                onClick={() => onRemoveTodo(item.id)}
            >
                <TrashIcon height='20px' width='20px' />
            </button>
    </li>
    );
}


TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    onCompletedCheck: PropTypes.func,
    editTodoItem: PropTypes.func
};


export default TodoListItem;