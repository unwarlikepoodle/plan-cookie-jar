const express = require('express');
const pool = require('./app/db');
const app = express();
const plansRouter = require('./app/routes/plans');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Plan Cookie Jar API!' });
});

app.use('/plans', plansRouter);

// Test route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});