import React from "react";

function AddTodoForm(props) {

    const [todoTitle, setTodoTitle] = React.useState('');

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        props.onAddTodo({title: todoTitle, id: Date.now()});
        setTodoTitle('');
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title: </label>
            <input 
                type="text" 
                id="todoTitle" 
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}>
            </input>
            <input type="submit" value="Add" />
        </form>
    );
}

export default AddTodoForm;
