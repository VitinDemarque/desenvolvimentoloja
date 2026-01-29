const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: 'postgres', // Connect to default postgres DB to create new DB
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connected to postgres database.');
    
    // Check if database exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'loja'");
    if (res.rowCount === 0) {
      console.log('Database "loja" does not exist. Creating...');
      await client.query('CREATE DATABASE loja');
      console.log('Database "loja" created successfully.');
    } else {
      console.log('Database "loja" already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
