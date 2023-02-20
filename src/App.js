import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([])

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    const newTodos = [...todos];
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = (idx) => {
    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
  };

  const FormTodo = ({ addTodo }) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      if (!value) return;
      addTodo(value)
      setValue('')
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label><b>Add Todo</b></Form.Label>
          <Form.Control type='text' value={value} placeholder='Add New Todo' className='input' onChange={(e) => { setValue(e.target.value) }} ref={inputRef} />
        </Form.Group>
        <Button className='mt-3' variant="primary mb-3" type="submit">Submit</Button>
      </Form>
    );
  };

  const Todo = ({ idx, todo, markTodo, deleteTodo }) => {
    return (
      <div className="todo">
        <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.text}</span>
        <div>
          <Button variant="outline-success" onClick={() => markTodo(idx)}>✓</Button>
          {' '}
          <Button variant="outline-danger" onClick={() => deleteTodo(idx)}>✕</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, idx) => (
            <Card>
              <Card.Body>
                <Todo
                  key={idx}
                  idx={idx}
                  todo={todo}
                  markTodo={markTodo}
                  deleteTodo={deleteTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
