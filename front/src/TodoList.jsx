import React from 'react';
import { useTodos } from '../context/TodoContext';

const TodoList = () => {
  const { todos, supprimerTodo } = useTodos();

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.titre}</h2>
          <button onClick={() => supprimerTodo(todo.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList; 