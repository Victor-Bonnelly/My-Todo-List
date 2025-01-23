import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [titreTodo, setTitreTodo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
 

  async function getAllTodos() {
    try {
      const reponse = await fetch('http://localhost:3001/todos');
      if (!reponse.ok) {
        throw new Error('La réponse du réseau n\'était pas correcte');
      }
      const data = await reponse.json();
      console.log(data);
      setTodos(data.todos);
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des todos :", error);
    }
  }

  async function ajouterTodo() {
    const nouveauTodo = { titre: titreTodo };

    const reponse = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nouveauTodo),
    });

    if (reponse.ok) {
      const data = await reponse.json();
      setTodos((prevTodos) => [...prevTodos, data.todo]);
      setTitreTodo("");
    } else {
      console.error("Erreur lors de l'ajout du todo");
    }
  }

  async function supprimerTodo(id) {
    try {
        const response = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du todo');
        }
        const data = await response.json();
        console.log(data.message);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
        console.error('Erreur:', error);
    }
  }

  const registerUser = async () => {
    const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        console.error('Erreur lors de l\'enregistrement:', error);
        if (response.status === 409) {
            setValidationMessage("L'utilisateur existe déjà.");
        } else {
            setValidationMessage("Erreur lors de l'enregistrement. Veuillez réessayer.");
        }
    } else {
        const data = await response.json();
        console.log('Réponse du serveur:', data);
        setValidationMessage("Inscription réussie !");
    }
  };

  useEffect(() => {
    getAllTodos()
  }, [])

  return (
    <>
      <h2>Inscription</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Entrez votre email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Entrez votre mot de passe" 
      />
      <button onClick={registerUser}>S&apos;inscrire</button>

      {validationMessage && <div className="validation-message">{validationMessage}</div>}

      <input 
        type="text" 
        value={titreTodo} 
        onChange={(e) => setTitreTodo(e.target.value)} 
        placeholder="Entrez le titre du todo" 
      />
      <button style={{ padding: "20px" }} onClick={ajouterTodo}>Ajouter</button>

      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h2>{todo.titre}</h2>
            <button onClick={() => supprimerTodo(todo._id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
