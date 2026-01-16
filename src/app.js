const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const protect = require('./middlewares/authMiddleware');

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('Chatbot Platform API running 🚀');
});

app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user,
  });
});

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
