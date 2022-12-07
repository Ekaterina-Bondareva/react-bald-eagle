import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function useSemiPersistentState() {
  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem('savedTodoList')));

  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {

  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}  onRemoveTodo={removeTodo}/>
    </>
  );

  function removeTodo(id) {
    const newTodoList = todoList.filter(
      (todo) => id !== todo.id
    );

    setTodoList(newTodoList);
  };
}

export default App;
