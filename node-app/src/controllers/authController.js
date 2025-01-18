// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // For hashing passwords
const { users } = require('../models/userModel'); // In a real application, this would be a DB call

// Dummy user for authentication (You can replace this with a database call)
const userDb = [
  { email: 'user@example.com', password: '$2a$10$E5F5EExGf9uA.wAfFzpQ9J17vnSjqwOYXuA6ZcNi02eF5Za1RfQfS' }  // Password: 'password123'
];

const login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = userDb.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the stored hashed password
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as response
    res.json({ token });
  });
};

module.exports = { login };
