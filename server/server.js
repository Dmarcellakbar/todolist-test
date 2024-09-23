// Ensure this is at the top of your file to load environment variables
require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// PostgreSQL pool configuration using Vercel environment variables
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use the Vercel connection string
  ssl: {
    rejectUnauthorized: false, // Allows connection with SSL mode
  },
});

// Check PostgreSQL connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.use(cors({
  origin: 'https://todolist-test-nu.vercel.app', // Adjust this to your Vue.js app's URL
}));
app.use(express.json());

// Endpoint to get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.todos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send(err.message);
  }
});

// Endpoint to add a new todo
app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      'INSERT INTO public.todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).send(err.message);
  }
});

// Endpoint to delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM public.todos WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).send(err.message);
  }
});

// Start the server without specifying a port
app.listen(process.env.PORT || 5002, () => {
  console.log(`Server running on port ${process.env.PORT || 5002}`);
});
