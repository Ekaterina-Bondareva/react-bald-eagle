import React from "react";

import TodoListItem from "./TodoListItem";

import styles from './TodoList.module.css';

import PropTypes from 'prop-types';


function TodoList(props) {

  return (
    <ul className={styles.TodoList}>
        {props.todoList.map(function (item) {
          return (
            <TodoListItem key={item.id} item={item} onRemoveTodo={props.onRemoveTodo}/>
          )
        })}
    </ul>
  );
}

TodoList.propTypes = {
  onRemoveTodo: PropTypes.func
};


export default TodoList;