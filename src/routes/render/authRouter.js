import express from 'express';

const authRouter = express.Router();

authRouter.get('/login', (req, res) => res.render('LoginPage'));

authRouter.get('/signup', (req, res) => res.render('SignupPage'));

authRouter.get('/logout', (req, res) => res
  .clearCookie('accessToken')
  .clearCookie('refreshToken')
  .redirect('/'));

export default authRouter;
