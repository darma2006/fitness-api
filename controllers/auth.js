const mongodb = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      username: req.body.username,
      password: hashedPassword
    };

    const response = await mongodb.getDb().collection('users').insertOne(user);
    res.status(201).json(response);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    
    const user = await mongodb
      .getDb()
      .collection('users')
      .findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔥 DEBUG AQUÍ
    console.log("USER:", user);
    console.log("PASSWORD SENT:", req.body.password);
    console.log("HASH IN DB:", user.password);

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };