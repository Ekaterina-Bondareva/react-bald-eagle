import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import styles from './App.module.css';

function App() {

  const [todoList, setTodoList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      }
    })
    .then((response) => response.json())
    .then(result => {
      setTodoList(result.records);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [isLoading, todoList]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <>
            {isLoading ? (
              <p>Loading...</p> 
            ) : (
              <>
                <h1  className={styles.MainHeader}>ToDo List</h1>
                <AddTodoForm onAddTodo={addTodo}/>
                <TodoList todoList={todoList}  onRemoveTodo={removeTodo}/>
              </>
            )}
          </>
        }>          
        </Route>

        <Route  path='/new' element={
          <>
            <h1>New Todo List</h1>
          </>
        }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );

  function removeTodo(id) {
    const newTodoList = todoList.filter(
      (todo) => id !== todo.id
    );

    setTodoList(newTodoList);
  };
}

export default App;