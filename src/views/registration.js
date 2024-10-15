exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email is already registered.');
      }
      
      // Create new user
      const user = new User({ username, email, password });
      // Save the user to the database
      await user.save();
  
      res.status(201).send('User registered successfully.');
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
          // Duplicate key error
          if (err.keyPattern.email) {
            return res.status(400).send('Email is already registered.');
          }
          if (err.keyPattern.username) {
            return res.status(400).send('Username is already taken.');
          }
        }
        res.status(500).send('Server error.');
    }
  };  