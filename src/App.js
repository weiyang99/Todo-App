import { useState } from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([
    {
      text: "This is a sample todo",
      completed: false
    }
  ])

  const addTodo = ({ text }) => {
    setTodos([{ text }, ...todos])
  }

  const markTodo = (idx) => {
    todos[idx].completed = !completed
    setTodos(todos)
  }

  const deleteTodo = (idx) => {
    setTodos(todos.splice(idx, 1))
  }

  const FormTodo = ({ addTodo }) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      if (!value) return;
      addTodo(value)
      setValue('')
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label><b>Add Todo</b></Form.Label>
          <Form.Control type='text' value={value} placeholder='Add New Todo' className='input' onChange={(e) => { setValue(e.target.value) }} />
        </Form.Group>
        <Button variant="primary mb-3" type="submit">Submit</Button>
      </Form>
    )
  }

  const Todo = ({ idx, todo, markTodo, deleteTodo }) => (
    <div className="todo">
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(idx)}>✓</Button>
        {' '}
        <Button variant="outline-danger" onClick={() => deleteTodo(idx)}>✕</Button>
      </div>
    </div>
  )

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
}

export default App;
