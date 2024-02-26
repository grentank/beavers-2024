import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../db/models';
import cookiesConfig from '../../config/cookiesConfig';
import generateTokens from '../../utils/generateTokens';

const apiAuthRouter = express.Router();

apiAuthRouter.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) return res.status(400).json({ message: 'Please fill all fields' });

  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, hashpass: await bcrypt.hash(password, 12) },
  });

  if (!created) return res.status(403).json({ message: 'User already exists' });

  const user = newUser.get();
  delete user.hashpass;

  const { accessToken, refreshToken } = generateTokens({ user });

  res.cookie('accessToken', accessToken, cookiesConfig.access)
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .sendStatus(200);
});

apiAuthRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const targetUser = await User.findOne({ where: { email } });
  if (!targetUser) return res.status(404).json({ message: 'User not found' });
  const passwordIsCorrect = await bcrypt.compare(password, targetUser.hashpass);
  if (!passwordIsCorrect) return res.status(403).json({ message: 'Incorrect password' });

  const user = targetUser.get();
  delete user.hashpass;

  const { accessToken, refreshToken } = generateTokens({ user });

  res.cookie('accessToken', accessToken, cookiesConfig.access)
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .sendStatus(200);
});

export default apiAuthRouter;
