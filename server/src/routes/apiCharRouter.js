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
      const newChar = await Character.create(req.body);
      res.status(201).json(newChar);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while creating' });
    }
  });

apiCharRouter
  .route('/:id')
  .delete(async (req, res) => {
    await Character.destroy({
      where: { id: req.params.id },
    });
    res.sendStatus(200);
  })
  .put(async (req, res) => {
    try {
      const targetChar = await Character.findOne({ where: { id: req.params.id } });
      for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
          targetChar[key] = req.body[key];
        }
      }
      await targetChar.save();
      res.json(targetChar);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ERROR EDITING CHAR' });
    }
  });

module.exports = apiCharRouter;
