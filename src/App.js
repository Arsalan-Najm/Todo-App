import { React, useState, useEffect } from 'react';
import Todos from './todo component/todos';

//input component
function Input({ addTodo }) {
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '') {
      alert('nothing to add! please add somthing to the list');
    } else {
      addTodo(input);
      setInput('');
      addTodo(input);
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='What do you wanna do?'
        onChange={handleChange}
        value={input}
        autoFocus
        className='w-72 md:w-96  my-6 px-2 py-4 border-0 outline-0 bg-transparent border-b-2 border-red-500 text-white'
      />
      <i
        className='bx bx-plus relative right-10 top-1 p-2 bg-red-500 text-white cursor-pointer'
        onClick={handleSubmit}
      ></i>
    </form>
  );
}

//app component
function App() {
  const [todos, setTodos] = useState(() => {
    //save data to local storage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content) => {
    let todoId = Math.random();
    const newTodo = [
      ...todos,
      { id: todoId, content: content, isCompleted: false },
    ];
    setTodos(newTodo);
  };
  const deletTodos = (id) => {
    let filterTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filterTodo);
  };
  const completedTodo = (id) => {
    let newTodos = [...todos];
    newTodos[id].isCompleted = !newTodos[id].isCompleted;
    setTodos(newTodos);
  };
  return (
    <div className='bg-gray-900 min-h-screen min-w-full'>
      <div className='relative flex justify-center items-center flex-col'>
        <div className='my-12'>
          <h1 className='text-7xl'>
            <span className='font-bold text-red-500'>Todo</span>
            <span className='text-white'>List</span>
          </h1>
        </div>
        <Todos
          todos={todos}
          deletTodos={deletTodos}
          completedTodo={completedTodo}
        />
        <Input addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
