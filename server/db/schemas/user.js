import mongoose from 'mongoose';
import express from 'express'; // Importer express pour créer le routeur

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
  },
});

// Ajout d'une méthode pour vérifier le mot de passe (exemple)
userSchema.methods.verifyPassword = function(password) {
  // Logique pour vérifier le mot de passe
  return this.password === password; // Remplacez par une vraie vérification
};

// Création d'un routeur pour les utilisateurs
const router = express.Router();

// Route pour l'enregistrement des utilisateurs
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Données reçues pour l\'enregistrement dans userSchema:', req.body); // Log des données reçues
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exporter le routeur
export default router;

// Exporter le schéma
export { userSchema }; 