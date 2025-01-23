import express from 'express';
import {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
} from '../controllers/todo-controller';

const router = express.Router();

// Route pour récupérer tous les todos
router.get('/todos', getAllTodos);

// Route pour créer un todo
router.post('/todos', createTodo);

// Route pour mettre à jour un todo
router.put('/todos/:id', updateTodo);

// Route pour supprimer un todo
router.delete('/todos/:id', deleteTodo);

export default router; 