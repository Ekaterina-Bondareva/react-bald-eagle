import React from "react";

import styles from './TodoListItem.module.css';

import { ReactComponent as TrashIcon } from '../trash.svg';

import PropTypes from 'prop-types';


function TodoListItem(props) {
    return (
        <li className={styles.ListItem}>
            {props.item.fields.Title}
            <button className={styles.ListItemTrashIcon} type="button" onClick={() => props.onRemoveTodo(props.item.id)}>
                <TrashIcon height='20px' width='20px' />
            </button>
        </li>
    );
}

TodoListItem.propTypes = {
    onRemoveTodo: PropTypes.func
};


export default TodoListItem;
