const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('exercises').find();
    const data = await result.toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('exercises').find({ _id: id });
    const data = await result.toArray();
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createExercise = async (req, res) => {
  try {
    const exercise = {
      name: req.body.name,
      muscle: req.body.muscle,
      equipment: req.body.equipment,
      sets: req.body.sets,
      reps: req.body.reps,
      difficulty: req.body.difficulty
    };

    // VALIDATION
    if (!exercise.name || !exercise.muscle) {
      return res.status(400).json({ message: "Name and muscle are required" });
    }

    const response = await mongodb.getDb().collection('exercises').insertOne(exercise);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateExercise = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const exercise = {
      name: req.body.name,
      muscle: req.body.muscle,
      equipment: req.body.equipment,
      sets: req.body.sets,
      reps: req.body.reps,
      difficulty: req.body.difficulty
    };

    // VALIDATION
    if (!exercise.name || !exercise.muscle) {
      return res.status(400).json({ message: "Name and muscle are required" });
    }

    const response = await mongodb
      .getDb()
      .collection('exercises')
      .replaceOne({ _id: id }, exercise);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteExercise = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('exercises')
      .deleteOne({ _id: id });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createExercise,
  updateExercise,
  deleteExercise
};