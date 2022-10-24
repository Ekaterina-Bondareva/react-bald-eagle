import React from 'react';

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

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return (
            <li key={item.id}>
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
