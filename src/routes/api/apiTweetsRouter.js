import express from 'express';
import { Op } from 'sequelize';
import { Tweet, User } from '../../../db/models';
import { verifyAccessToken } from '../../middlewares/verifyTokens';

const apiTweetsRouter = express.Router();

apiTweetsRouter
  .route('/')
  .get((req, res) => {
    res.json([]);
  })
  .post(verifyAccessToken, async (req, res) => {
    const newTweet = await Tweet.create({
      ...req.body,
      authorId: res.locals.user.id,
    });
    const newTweetWithAuthor = await Tweet.findOne({
      where: { id: newTweet.id },
      include: User,
    });
    res.json(newTweetWithAuthor);
  });

apiTweetsRouter.get('/search', async (req, res) => {
  const { text } = req.query;
  const tweetsContaingText = await Tweet.findAll({
    where: {
      body: {
        [Op.like]: `%${text}%`,
      },
    },
  });
  res.json(tweetsContaingText);
});

export default apiTweetsRouter;
