const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Chatbot Platform API running 🚀');
});

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
