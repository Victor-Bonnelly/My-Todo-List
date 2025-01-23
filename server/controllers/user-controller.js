import bcrypt from 'bcrypt';
import userRepository from '../db/repository/user-repository.js';
import User from '../db/models/User.js';

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { email, password: hashedPassword };
  await userRepository.create(userData);

  return res.status(201).json({ message: 'Utilisateur créé avec succès.' });
};

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { email, password: hashedPassword };
    try {
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const userController = {
  register,
  registerUser,
};

export default userController; 