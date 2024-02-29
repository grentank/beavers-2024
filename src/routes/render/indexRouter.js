import express from 'express';
import 'dotenv/config';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('IndexPage', { inDocker: !!process.env.IN_DOCKER });
});

router.get('/account', (req, res) => res.render('AccountPage'));

router.get('/search', (req, res) => res.render('SearchPage'));

router.get('*', (req, res) => res.render('NotFoundPage'));

export default router;
