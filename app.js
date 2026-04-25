require('dotenv').config();
const express = require('express');
const app = express();

const logger = require('./src/middleware/logger');
const taskRoutes = require('./src/routes/taskRoutes');

const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(logger);


app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API berjalan dengan baik!' });
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
