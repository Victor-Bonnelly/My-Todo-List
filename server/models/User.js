import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

// Exporter le modèle User comme exportation par défaut
export default User; 