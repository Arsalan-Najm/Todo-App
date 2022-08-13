import { React, useEffect, useRef } from 'react';

function Todos({ todos, deletTodos, completedTodo }) {
  const refs = useRef(new Map()).current;

  return (
    <div>
      {todos.length ? (
        todos.map((todo, id) => {
          return (
            <ul
              key={todo.id}
              className='bg-gray-300 md:w-96 p-3 border-b-2 border-red-500'
              style={{
                background: todo.isCompleted ? '#65c18c' : '#d1d5db',
              }}
            >
              <li>
                <input
                  type='text'
                  defaultValue={todo.content}
                  style={{
                    textDecoration: todo.isCompleted ? 'line-through' : '',
                  }}
                  ref={(selected) =>
                    selected === null
                      ? refs.delete(todo.id)
                      : refs.set(todo.id, selected)
                  }
                  className='bg-transparent text-lg'
                />
                <div className='float-right'>
                  <i
                    title='edit todo'
                    className='bx bx-edit mx-2 text-xl text-gray-900 font-bold cursor-pointer'
                    onClick={() => refs.get(todo.id).focus()}
                  ></i>
                  <i
                    title='delete todo'
                    className='bx bx-trash mx-2 text-xl text-red-900 font-semi cursor-pointer'
                    onClick={() => deletTodos(todo.id)}
                  ></i>
                  <i
                    title='mark as completed'
                    className='bx bx-check mx-2 text-xl text-green-900 font-bold cursor-pointer'
                    onClick={() => completedTodo(id)}
                  ></i>
                </div>
              </li>
            </ul>
          );
        })
      ) : (
        <h1 className='text-2xl text-gray-500'>Nothing on the list!</h1>
      )}
    </div>
  );
}
export default Todos;
