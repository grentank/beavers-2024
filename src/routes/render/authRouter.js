import express from 'express';
import checkAuthFactory from '../../middlewares/checkAuthFactory';

const authRouter = express.Router();

authRouter.get('/login', checkAuthFactory(false), (req, res) => res.render('LoginPage'));

authRouter.get('/signup', checkAuthFactory(false), (req, res) => res.render('SignupPage'));

authRouter.get('/logout', (req, res) => res
  .clearCookie('accessToken')
  .clearCookie('refreshToken')
  .redirect('/'));

export default authRouter;
