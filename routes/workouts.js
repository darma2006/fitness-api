const express = require('express');
const router = express.Router();

const controller = require('../controllers/workouts');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', controller.createWorkout);
router.put('/:id', controller.updateWorkout);
router.delete('/:id', controller.deleteWorkout);

module.exports = router;