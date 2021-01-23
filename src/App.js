import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();

  const d = new Date();
  const date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("LSKEY"));
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("LSKEY", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const addHandler = (e) => {
    const name = todoRef.current.value;
    setTodos((prev) => {
      return [
        ...prev,
        {
          id: uuidv4(),
          name: name,
          completed: false,
          date: date,
          time: time,
        },
      ];
    });
    todoRef.current.value = "";
  };

  const checkboxHandler = (id) => {
    const newTodos = [...todos];
    const clickedBox = newTodos.find((todo) => todo.id === id);
    clickedBox.completed = !clickedBox.completed;
    setTodos(newTodos);
  };

  const clearHandler = () => {
    const newTodos = [...todos];
    const undoneTodos = newTodos.filter((todo) => !todo.completed);
    setTodos(undoneTodos);
  };

  const clearAllHandler = () => {
    setTodos([]);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="checkList">
        <div className="buttonContainer">
          <input
            onKeyDown={keyDownHandler}
            id="nameInput"
            ref={todoRef}
            defaultValue=""
            type="text"
          />
          <button onClick={addHandler}>Add Todo</button>
          <button onClick={clearHandler}>Clear Done</button>
          <button onClick={clearAllHandler}>Clear all</button>
        </div>
        <TodoList todos={todos} checkboxHandler={checkboxHandler}></TodoList>
      </div>
      <div id="todosLeft">
        {todos.filter((todo) => !todo.completed).length !== 0
          ? `${todos.filter((todo) => !todo.completed).length} Todos left to do`
          : "Your schedule is clear!"}
      </div>
    </div>
  );
}

export default App;
