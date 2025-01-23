import mongoose from 'mongoose';
import { userSchema } from '../schemas/user.js';

// Vérifiez si le modèle existe déjà pour éviter l'erreur de redéfinition
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 