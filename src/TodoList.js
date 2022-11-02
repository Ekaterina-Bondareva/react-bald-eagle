import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    {
      id: 1,
      title: "Visit Paris",
    },
    {
      id: 2,
      title: "Visit London",
    },
    {
      id: 3,
      title: "Visit Moscow",
    },
];

function TodoList() {
    return (
      <ul>
          {todoList.map(function (item) {
            return (
              <TodoListItem key={item.id} item={item} />
            )
          })}
      </ul>
    );
}

export default TodoList;
