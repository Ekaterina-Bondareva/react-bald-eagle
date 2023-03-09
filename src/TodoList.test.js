import { render, screen } from "@testing-library/react";
import TodoList from "./components/TodoList";


test("No Greeting if todo list is empty", () => {
// render the component on virtual dom
    render(<TodoList  todoList={[]} onRemoveTodo={jest.fn()} markCompleted={jest.fn()} editTodoItem={jest.fn()} />);

    const greeting = screen.queryByText("You did it! Great job!");

    expect(greeting).toBeNull();
});

test("No Greeting if todo list has uncompleted items", () => {
    const list = [{"id": 1, "fields": {"Completed": false}}, {"id": 2, "fields": {}}]
    // render the component on virtual dom
    render(<TodoList  todoList={list} onRemoveTodo={jest.fn()} markCompleted={jest.fn()} editTodoItem={jest.fn()} />);
    
    const greeting = screen.queryByText("You did it! Great job!");
    
    expect(greeting).toBeNull();
});

test("Greeting if all items in todo list are completed", () => {
    const list = [{"id": 1, "fields": {"Completed": true}}, {"id": 2, "fields": {"Completed": true}}]
    // render the component on virtual dom
    render(<TodoList  todoList={list} onRemoveTodo={jest.fn()} markCompleted={jest.fn()} editTodoItem={jest.fn()} />);
    
    const greeting = screen.queryByText("You did it! Great job!");
    
    expect(greeting).not.toBeNull();
});

test("No greeting if both completed and not completed items are in todo list", () => {
    const list = [{"id": 1, "fields": {"Completed": true}}, {"id": 2, "fields": {"Completed": false}}]
    // render the component on virtual dom
    render(<TodoList  todoList={list} onRemoveTodo={jest.fn()} markCompleted={jest.fn()} editTodoItem={jest.fn()} />);
    
    const greeting = screen.queryByText("You did it! Great job!");
    
    expect(greeting).toBeNull();
});