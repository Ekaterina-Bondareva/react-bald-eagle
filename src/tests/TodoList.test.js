import { TodoList } from "../components/TodoList"
import styles from '../components/TodoList.module.css';
import { fireEvent, render } from "@testing-library/react";

const createTodoList = (todoItems) => {
    return render(<TodoList todoList={todoItems}  onRemoveTodo={jest.fn()} markCompleted={jest.fn()} editTodoItem={jest.fn()}/>)
}

describe("TodoList component", () => {
    test("Congrats message should not be visible if todo list is empty", () => {
        const todo = createTodoList([])
        expect(todo(/You did it! Great job!/)).toNotBeInTheDocument();
    });    
    
});