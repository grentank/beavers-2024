import { Tweet } from '../../db/models';

export default async function checkAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const targetTweet = await Tweet.findOne({ where: { id } });
    if (targetTweet.authorId === res.locals?.user?.id) return next();
    return res.status(403).json({ message: 'Forbidden' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}
