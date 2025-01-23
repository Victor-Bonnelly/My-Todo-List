import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
    createTodo,
    mettreAjourTodos,
    recupererToutesTodos,
    supprimerTodos
} from "./db/repository/todos-repository.js";
import userRoutes from './routes/user-routes.js';
import todoRoutes from './db/schemas/todos.js';
import bodyParser from 'body-parser';
import User from './db/models/User.js';

const DB_NAME = "todos";
const MONGO_URI = "mongodb+srv://root:Victor84290.@cluster0.q99ej.mongodb.net/" + DB_NAME;

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', todoRoutes);

app.get('/ping', (requete, reponse) => {
    reponse.end('<h1>Pong</h1>');
});

app.get('/todos', async (requete, reponse) => {
    const listeDesTaches = await recupererToutesTodos();
    reponse.json({ todos: listeDesTaches })
})

app.post('/todos', async (requete, reponse) => {
    const data = requete.body;
    const createdTodo = await createTodo(data);
    reponse.json({ todo: createdTodo })
})

app.put('/todos/:id', async (requete, reponse) => {
    const id = requete.params.id;
    const titre = requete.body.titre;
    const description = requete.body.description;
    const todoMisAjour = await mettreAjourTodos(id, { titre, description });
    reponse.json({ updatedTodo: todoMisAjour });
})

app.delete('/todos/:id', async (requete, reponse) => {
    const id = requete.params.id;
    const result = await supprimerTodos(id);
    if (result.deletedCount === 0) {
        return reponse.status(404).json({ message: "Todo non trouvé" });
    }
    reponse.json({ message: "Todo supprimée avec succès !" });
})

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3001, function () {
    console.log('Serveur lancé sur le port 3001!');
    mongoose.connect(MONGO_URI).then(() => {
        console.log("BDD connecté");
    }).catch(() => {
        console.log("Pas connecté");
    })
})
