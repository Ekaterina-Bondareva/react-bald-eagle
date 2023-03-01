import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import PropTypes from 'prop-types';


// Renders todo list elements
const TodoList = ({todoList, onRemoveTodo, markCompleted, editTodoItem}) => {
  // Function that check that all todo items were completed
  const isCompleted = (todoList) => {
    return todoList.length > 0 && todoList.reduce((accumulator, currentValue) => 
      accumulator && (currentValue.fields.Completed !== 'undefined' && currentValue.fields.Completed), 
    true);
  };

  const [completed, setCompleted] = useState(isCompleted(todoList));

  return (
    <>
      {/* "Great job" motivation message if user completed all todo's */}
      {
        completed ? (<p className={styles.GreatJobMsg}>You did it! Great job!</p>) : (<p></p>)
      }
      {/* Todo list rendering */}
      <ul>
        {todoList.map((item) => 
          <TodoListItem 
            key={item.id}
            item={item} 
            onRemoveTodo={() => {
              // Remove from database
              onRemoveTodo(item.id);
              // Remove from list
              todoList = todoList.filter(
                (todo) => item.id !== todo.id
              );
              // Recalculate status
              setCompleted(isCompleted(todoList));
            }} 
            editTodoItem={editTodoItem}
            // Recalculated completed status
            onCompletedCheck={() => {
              markCompleted(item); 
              setCompleted(isCompleted(todoList));
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