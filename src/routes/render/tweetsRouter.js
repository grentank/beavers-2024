import express from 'express';
import { Tweet, User } from '../../../db/models';

const tweetsRouter = express.Router();

tweetsRouter.get('/', async (req, res) => {
  const tweetsFromBackend = await Tweet.findAll({ include: User });
  res.render('TweetsPage', { tweetsFromBackend });
});

tweetsRouter.get('/:id', (req, res) => res.render('NotFoundPage'));

export default tweetsRouter;

// npx create-react-ssr-layout@latest
