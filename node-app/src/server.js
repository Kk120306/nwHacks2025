// backend/src/server.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Use the auth routes for handling authentication
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
