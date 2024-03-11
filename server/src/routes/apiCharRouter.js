const express = require('express');
const { Character } = require('../../db/models');

const apiCharRouter = express.Router();

apiCharRouter
  .route('/')
  .get(async (req, res) => {
    const chars = await Character.findAll({
      order: [['id', 'DESC']],
    });
    res.json(chars);
  })
  .post(async (req, res) => {
    try {
      const newChar = await Character.create({
        ...req.body,
        alive: !!req.body.alive,
      });
      res.status(201).json(newChar);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while creating' });
    }
  });

apiCharRouter.route('/:id').delete(async (req, res) => {
  await Character.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(200);
});

module.exports = apiCharRouter;
