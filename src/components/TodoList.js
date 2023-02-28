import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import PropTypes from 'prop-types';


//what this functional component doing in general
const TodoList = ({todoList, onRemoveTodo, markCompleted, editTodoItem}) => {
// ????todolist array or array of objects? what we are doing here
  const [completed, setCompleted] = useState(
    todoList.length > 0 && todoList.reduce((accumulator, currentValue) => 
      accumulator && (currentValue.fields.Completed !== 'undefined' && currentValue.fields.Completed), true)
  );

  return (
    <>
      {/* "Great job" motivation message if user completed all todo's */}
      {
        completed ? (<p className={styles.GreatJobMsg}>You did it! Great job!</p>) : (<p></p>)
      }
      {/* ??? */}
      <ul>
        {todoList.map((item) => 
          <TodoListItem 
            key={item.id}
            item={item} 
            onRemoveTodo={onRemoveTodo} 
            editTodoItem={editTodoItem}
            // ???
            onCompletedCheck={() => {
              markCompleted(item); 
              setCompleted(todoList.reduce((accumulator, currentValue) => 
                accumulator && (currentValue.fields.Completed !== 'undefined' && currentValue.fields.Completed), true));
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