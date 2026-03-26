const express = require('express');
const router = express.Router();

const controller = require('../controllers/exercises');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', controller.createExercise);
router.put('/:id', controller.updateExercise);
router.delete('/:id', controller.deleteExercise);

module.exports = router;