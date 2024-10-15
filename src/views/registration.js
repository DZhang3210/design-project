// User Registration
exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // **Check if email already exists**
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email is already registered.');
      }
  
      // Create a new user instance
      const user = new User({ username, email, password });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).send('User registered successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error.');
    }
  };  