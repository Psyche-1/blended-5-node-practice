import { register } from '../services/users.js';

export const registerController = async (req, res) => {
  const data = await register(req.body);
  res.json({
    status: 201,
    message: 'Successfully register user',
    data,
  });
};
