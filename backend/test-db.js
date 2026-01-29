const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

console.log('Tentando conectar com:');
console.log('User:', process.env.PGUSER);
console.log('Pass:', process.env.PGPASSWORD);
console.log('DB:', process.env.PGDATABASE);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ ERRO DE CONEXÃO:', err.message);
  } else {
    console.log('✅ SUCESSO! Banco conectado.');
    console.log('Hora do servidor:', res.rows[0].now);
  }
  pool.end();
});
