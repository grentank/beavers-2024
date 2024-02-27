import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('IndexPage');
});

router.get('/account', (req, res) => res.render('AccountPage'));

router.get('/search', (req, res) => res.render('SearchPage'));

router.get('*', (req, res) => res.render('NotFoundPage'));

export default router;
