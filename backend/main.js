const express = require('express');
const app = express();
const plansRouter = require('./app/routes/plans');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Plan Cookie Jar API!' });
});

app.use('/plans', plansRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});