import mongoose from 'mongoose';
import express from 'express'; 

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


userSchema.methods.verifyPassword = function(password) {
 
  return this.password === password; 
};


const router = express.Router();


router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Données reçues pour l\'enregistrement dans userSchema:', req.body);
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default router;


export { userSchema }; 