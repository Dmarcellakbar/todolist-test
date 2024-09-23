// db.js
const { Pool } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Create a new pool instance using the connection URL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Adjust this if your DB requires SSL
  },
});

// Function to test the connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    // Example query to test
    const res = await client.query('SELECT NOW()');
    console.log('Current Time:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

// Test the connection
testConnection();

module.exports = pool;
