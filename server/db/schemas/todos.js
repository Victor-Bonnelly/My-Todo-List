import mongoose from "mongoose";
import express from 'express';
import Todo from '/Users/victor/Desktop/Victor_perso/Bachelor/INTROCEXPRESS/server/db/models/Todo.js';

// Un schema explique le format des documents d'une collection.
const TodosSchema = mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    isFinish: { type: Boolean, required: true, default: false }
});

// Le model permet l'interaction avec la collection
export const TodosModel = mongoose.model('Todos', TodosSchema);

const router = express.Router();

// Route pour supprimer un todo
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: 'Todo non trouvé' });
    }
    res.status(200).send({ message: 'Todo supprimé avec succès' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la suppression du todo' });
  }
});

export default router;

