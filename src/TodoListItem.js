import React from "react";

function TodoListItem(props) {
    return (
        <li>
            {props.item.fields.Title}
            <button type="button" onClick={() => props.onRemoveTodo(props.item.id)}>Remove</button>
        </li>
    );
}

export default TodoListItem;
