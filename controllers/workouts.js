const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('workouts').find();
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
    const result = await mongodb.getDb().collection('workouts').find({ _id: id });
    const data = await result.toArray();
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createWorkout = async (req, res) => {
  try {
    const workout = {
      name: req.body.name,
      duration: req.body.duration,
      caloriesBurned: req.body.caloriesBurned,
      date: req.body.date,
      difficulty: req.body.difficulty,
      type: req.body.type,
      notes: req.body.notes,
      trainer: req.body.trainer
    };

    // VALIDATION
    if (!workout.name || !workout.duration) {
      return res.status(400).json({ message: "Name and duration are required" });
    }

    const response = await mongodb.getDb().collection('workouts').insertOne(workout);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateWorkout = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const workout = {
      name: req.body.name,
      duration: req.body.duration,
      caloriesBurned: req.body.caloriesBurned,
      date: req.body.date,
      difficulty: req.body.difficulty,
      type: req.body.type,
      notes: req.body.notes,
      trainer: req.body.trainer
    };

    // VALIDATION
    if (!workout.name || !workout.duration) {
      return res.status(400).json({ message: "Name and duration are required" });
    }

    const response = await mongodb
      .getDb()
      .collection('workouts')
      .replaceOne({ _id: id }, workout);

    console.log("UPDATE RESULT:", response); // 👈 DEBUG

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Workout not found or no changes made" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteWorkout = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const response = await mongodb.getDb().collection('workouts')
      .deleteOne({ _id: id });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "Workout not found" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createWorkout,
  updateWorkout,
  deleteWorkout
};