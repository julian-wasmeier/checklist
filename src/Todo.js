import React from "react";
import "./App.css";
function Todo({ todos, checkboxHandler }) {
  function handleCheckbox() {
    checkboxHandler(todos.id);
  }
  return (
    <div>
      <label className="Todo">
        <input
          id="checkbox"
          onChange={handleCheckbox}
          checked={todos.completed}
          type="checkbox"
        />
        <p class="todoName">{todos.name}</p>
      </label>

      <div class="dateContainer">
        <span id="date">{todos.date}</span>

        <span id="time">{todos.time}</span>
      </div>
    </div>
  );
}

export default Todo;
