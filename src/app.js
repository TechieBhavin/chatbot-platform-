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

app.use('/api/projects', require('./routes/projectRoutes'));

app.use('/api', require('./routes/promptRoutes'));

app.get('/', (req, res) => {
  res.send('Chatbot Platform API running 🚀');
});

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
