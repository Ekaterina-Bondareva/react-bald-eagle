import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList(props) {

  return (
    <ul>
        {props.todoList.map(function (item) {
          return (
            <TodoListItem key={item.id} item={item} onRemoveTodo={props.onRemoveTodo}/>
          )
        })}
    </ul>
  );
}

export default TodoList;