import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import PropTypes from 'prop-types';


const TodoList = ({todoList, onRemoveTodo, markCompleted, editTodoItem}) => {

  const [completed, setCompleted] = useState(
    todoList.reduce((accumulator, currentValue) => 
      accumulator && (currentValue.fields.Completed !== 'undefined' && currentValue.fields.Completed), true)
  );

  return (
    <>
    {
      completed ? (<p align="center">You did it! Great job!</p>) :(<p></p>)
    }
      <ul className={styles.TodoList}>
          {todoList.map((item) => 
            <TodoListItem 
              key={item.id}
              item={item} 
              onRemoveTodo={onRemoveTodo} 
              editTodoItem={editTodoItem}
              
              onCompletedCheck={() => {
                markCompleted(item); 
                setCompleted(todoList.reduce((accumulator, currentValue) => 
                  accumulator && (currentValue.fields.Completed !== 'undefined' && currentValue.fields.Completed), true))
              }}
            />
          )}
      </ul>
    </>
  );
}


TodoList.propTypes = {
  onRemoveTodo: PropTypes.func,
  markCompleted: PropTypes.func,
  todoList: PropTypes.array,
  editTodoItem: PropTypes.func
};


export default TodoList;