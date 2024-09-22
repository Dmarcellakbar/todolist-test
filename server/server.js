require('dotenv').config(); // Ini harus ada di bagian atas
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
// Konfigurasi pool PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});



app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.todos ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
      console.error('Error fetching todos:', err); // Log error
      res.status(500).send(err.message);
    }
  });
  
  

app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      'INSERT INTO public.todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM public.todos WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Menjalankan server
app.listen(process.env.PORT || 5002, () => {
  console.log(`Server running on port ${process.env.PORT || 5002}`);
});
