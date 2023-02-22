import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { ReactComponent as CheckedCheckboxIcon } from '../icons/checkedCheckbox.svg';
import { ReactComponent as EmptyCheckboxIcon } from '../icons/emptyCheckbox.svg';
import { ReactComponent as HamburgerIcon } from '../icons/hamburger.svg';
import Dropdown from './Dropdown';



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
        <li className={styles.ListItem}>
            <span>
                <div>
                    {errorMessage !== '' ? (<p className={styles.Error} >{errorMessage}</p>) :(<p></p>)}
                </div>
                <button 
                    className={styles.ListItemCheckbox} 
                    type="button"
                    onClick={handleCompletedClick}>
                    {
                        completed ?
                        (<CheckedCheckboxIcon height='20px' width='20px' />) :
                        (<EmptyCheckboxIcon height='20px' width='20px' />) 
                    }
                </button>
                { !editable ? item.fields.Title : ''}    
                {editable 
                    ? (<input type="text" autoFocus defaultValue={inputValue} onChange={(e) => {setInputValue(e.target.value)}} onKeyDown={handleInputClick} />) 
                    : (null)
                }
            </span>
            <span>  
                <Dropdown 
                    trigger={<button className={styles.Hamburger}><HamburgerIcon className={styles.Hamburger} height='20px' width='20px' /></button>}
                    menu={[
                        <button onClick={handleEditClick}>Edit</button>,
                        <button onClick={handleDeleteClick}>Delete</button>,
                    ]}
                />  
            </span>
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