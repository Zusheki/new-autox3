const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  try {
    // Create connection without database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('🔗 Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'autox_db'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'autox_db'}' created or already exists`);

    await connection.end();
    console.log('🔌 Connection closed');

  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    process.exit(1);
  }
};

createDatabase();