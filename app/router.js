// Instantiate Express Router
const express = require('express');
const appRouter = express.Router();

// Models
const { Immersive, Student } = require('./model');

// Routes
appRouter.route('/immersives')
  .get(async (request, response) => {
    try {
      const allImmersives = await Immersive.findAll({
        include: [Student]
      });
      response.json(allImmersives);
    } catch (error) {
      response.status(404).json({ err: error.message })
    }
  });

// Exports
module.exports = appRouter;
