import React, {useState, useEffect} from 'react';
import AddTodoForm from './AddTodoForm.js';
import TodoList from './TodoList';
import styles from './TodoContainer.module.css';
import ToggleSwitch from './ToggleSwitch.js';


const TodoContainer = ({listId}) => {

    const [todoList, setTodoList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [toggleChecked, setToggleChecked] = useState(true);

    const [isError, setIsError] = useState(false);

    const handleToggleChange = (val) => {
        setToggleChecked(val);
    }
    
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;

    //Sorting function. Sort Todo list Data by "Title" A-to-Z or Z-to-A with Toggle button
    const sortByTitle = (flag, array) => {
        if (flag) {
            //descending alphabetical order by "Title" (Z-to-A)
            array.sort((a, b) => 
                a.fields.Title.toLowerCase() === b.fields.Title.toLowerCase() ? 0 : 
                a.fields.Title.toLowerCase() < b.fields.Title.toLowerCase() ? 1 : -1); 
        } else {
            //ascending alphabetical order by "Title" (A-to-Z)
            array.sort((a, b) => 
                a.fields.Title.toLowerCase() === b.fields.Title.toLowerCase() ? 0 : 
                a.fields.Title.toLowerCase() < b.fields.Title.toLowerCase() ? -1 : 1); 
        }
    }

    //Fetch Todo list from Airtable  (READ)
    useEffect(() => {
        //Fetch only data with this ListID (filterByFormula=ListID%3D${listId})
        fetch(`${url}?view=Grid%20view&filterByFormula=ListID%3D${listId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
        })
        .then((response) => response.json())
        .then(result => {
            sortByTitle(toggleChecked, result.records);
            setTodoList(result.records);
            setIsLoading(false);
            setIsError(false);
        })
        .catch(() => {
            setIsError(true)
            setIsLoading(false);
        });
    }, [toggleChecked, url, listId]);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    }, [isLoading, todoList]);

    //Insert data to AirTable from user input (CREATE)
    const addTodo = (newTodo) => {
        let body = JSON.stringify(
            {
                fields: {
                    "Title": newTodo.fields.Title,
                    "ListID": listId
                }  
            }
        )
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then((response) => {
            return response.json()
        })
        .then(result => {
            let newValues = [...todoList, result]
            sortByTitle(toggleChecked, newValues);
            setTodoList(newValues);
            setIsLoading(false);
            setIsError(false);
        })
        .catch(() => setIsError(true));
    }

    //Delete data from AirTable (DELETE)
    const removeTodo = (id) => {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        })
        .then(() => {      
            const newTodoList = todoList.filter(
                (todo) => id !== todo.id
            );

            setTodoList(newTodoList);
            setIsError(false);
        })
        .catch(() => setIsError(true));
    }

    //Edit data in Airtable (UPDATE)
    const editTodoItem = (item) => {
        let body = JSON.stringify({
            "fields": {
                "Title": item.fields.Title,
                "Completed": item.fields.Completed,
                "ListID": listId
            }
        });
        fetch(`${url}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(() => {
            setIsError(false);
        })
        .catch(() => setIsError(true));
    }

    //Handle completed checkbox (UPDATE)
    const markCompleted = (item) => {
        item.fields.Completed = !item.fields.Completed;
        editTodoItem(item);
    }

    return (
        <>
            {isError && <p>Something went wrong ...</p>}
            {isLoading ? (
                <p className={styles.Loading}>Loading...</p> 
            ) : (
                <div className={styles.TodoContainer}>
                    {/* <h1  className={styles.MainHeader}>ToDo List</h1> */}
                    <ToggleSwitch toggleChecked={toggleChecked} handleToggleChange={handleToggleChange}/>
                    <TodoList todoList={todoList}  onRemoveTodo={removeTodo} markCompleted={markCompleted} editTodoItem={editTodoItem}/>
                    <AddTodoForm onAddTodo={addTodo}/>
                </div>
            )}
        </>
    );
}


export default TodoContainer;