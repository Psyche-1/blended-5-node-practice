import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { randomBytes } from 'node:crypto';

export const findSession = (query) => SessionCollection.findOne(query);

export const findUser = (query) => UserCollection.findOne(query);

const createsession = async(userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  return newUser;
};

export const login = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isValidPassword = await bcrypt.compare(payload.password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid password');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  return await createsession(user._id);
};

export const logoutUser = async (sessionId) => {
  return await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshSession = async(sessionId, refreshToken) => {
  const session = await SessionCollection.findOne({_id: sessionId, refreshToken});
  console.log(session);
  

  if(!session) {
    throw createHttpError(401, 'Session not found');
  }

  if(new Date() > new Date(session.accessTokenValidUntil)) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({_id: sessionId, refreshToken});

  return await createsession(session.userId);
};
