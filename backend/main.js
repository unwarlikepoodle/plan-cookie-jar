const express = require('express');
const cors = require('cors');
const pool = require('./app/db');
const app = express();
const plansRouter = require('./app/routes/plans');
const usersRouter = require('./app/routes/users');

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Allow cookies and credentials
}));

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Plan Cookie Jar API!' });
});

app.use('/api', plansRouter);
app.use('/api', usersRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});