require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Route Handlers
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// Error handler for Clerk auth middleware
app.use((err, req, res, next) => {
  if (err.message === 'Unauthenticated') {
    return res.status(401).json({ message: 'Unauthenticated user' });
  }
  next(err);
});

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});