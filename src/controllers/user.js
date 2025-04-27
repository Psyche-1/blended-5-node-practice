import { ONE_DAY } from '../constants/index.js';
import { register, login } from '../services/users.js';

export const registerController = async (req, res) => {
  const data = await register(req.body);
  res.json({
    status: 201,
    message: 'Successfully register user',
    data,
  });
};

const setUpSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);
  setUpSession(res, session);


  res.json({
    status: 201,
    message: 'Successfully register user',
    data: { accessToken: session.accessToken, },

  });
};
