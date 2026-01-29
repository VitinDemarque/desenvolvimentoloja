const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

const sqlFile = path.join(__dirname, 'database.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

console.log('Executando script de banco de dados...');

pool.query(sql, (err, res) => {
  if (err) {
    console.error('❌ ERRO AO EXECUTAR SCRIPT:', err.message);
  } else {
    console.log('✅ SUCESSO! Banco de dados populado com tabelas e dados.');
  }
  pool.end();
});
