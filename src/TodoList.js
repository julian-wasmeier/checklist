import React from "react";
import Todo from "./Todo";

function TodoList({ todos, checkboxHandler }) {
  return (
    <div className="todoContainer">
      {todos.map((todos) => {
        return (
          <Todo
            key={todos.id}
            todos={todos}
            checkboxHandler={checkboxHandler}
          />
        );
      })}
    </div>
  );
}

export default TodoList;
