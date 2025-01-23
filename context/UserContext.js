import React, { createContext, useState } from 'react';

// Créer le contexte
export const UserContext = createContext();

// Créer un fournisseur de contexte
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    const registerUser = async (email, password) => {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            setMessage(error.message);
            console.error('Erreur lors de l\'enregistrement:', error);
        } else {
            const data = await response.json();
            setUser(data.user); // Assurez-vous que votre backend renvoie l'utilisateur
            setMessage('Utilisateur enregistré avec succès');
            console.log('Réponse du serveur:', data);
        }
    };

    return (
        <UserContext.Provider value={{ user, message, registerUser }}>
            {children}
        </UserContext.Provider>
    );
}; 