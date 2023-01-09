import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {

  const [todoList, setTodoList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) => 
      setTimeout(
        () => resolve({data: {todoList: JSON.parse(localStorage.getItem('savedTodoList'))}}), 
        2000
      )
    ).then(result => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        <>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo}/>
          <TodoList todoList={todoList}  onRemoveTodo={removeTodo}/>
        </>
      )}
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
