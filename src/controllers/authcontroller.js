// controllers/authController.js

const User = require('../models/userModel');

// User Registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user instance
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    res.status(201).send('User registered successfully.');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error registering user.');
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      // Set the user session
      req.session.userId = user._id;
      res.send('Login successful.');
    } else {
      res.status(400).send('Invalid email or password.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
};

// User Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully.');
};
