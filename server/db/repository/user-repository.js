import User from '../models/User.js';


export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const userRepository = {
  findByEmail,
  create,
};

export default userRepository; 