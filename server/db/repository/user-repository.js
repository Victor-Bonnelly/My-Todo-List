import User from '../models/User.js';

// Récupérer l'utilisateur avec son email
export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

// Créer un utilisateur
export const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Exporter les fonctions comme exportation par défaut
const userRepository = {
  findByEmail,
  create,
};

export default userRepository; // Utilisez l'exportation par défaut 