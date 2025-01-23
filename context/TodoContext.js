import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const supprimerTodo = async (id) => {
    console.log(`Envoi de la requête de suppression pour l'ID: ${id}`);
    const reponse = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    });

    console.log(`Réponse de la requête de suppression:`, reponse);

    if (reponse.ok) {
      console.log(`Suppression réussie pour l'ID: ${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } else {
      console.error("Erreur lors de la suppression du todo");
    }
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, supprimerTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext); 