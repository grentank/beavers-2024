import express from 'express';
import { Tweet, User } from '../../../db/models';
import checkAuthFactory from '../../middlewares/checkAuthFactory';

const tweetsRouter = express.Router();

tweetsRouter.get('/', checkAuthFactory(true), async (req, res) => {
  try {
    const tweetsFromBackend = await Tweet.findAll({ include: User });
    res.render('TweetsPage', { tweetsFromBackend });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

tweetsRouter.get('/:id', (req, res) => res.render('NotFoundPage'));

export default tweetsRouter;

// npx create-react-ssr-layout@latest
