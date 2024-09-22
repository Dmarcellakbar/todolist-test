const { Client } = require('pg');
require('dotenv').config();

const pool = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect();

pool.query(`SELECT * FROM public.todos`, (err, res)=>{
    if(!err){
        console.log(res.rows)
    }else{
        console.log(err.message)
    }
    pool.end;
})

