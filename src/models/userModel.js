const pool = require('../config/database');

/**
 * Inicializa la tabla de usuarios si no existe.
 */
const initUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(100) NOT NULL,
      email     VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {string} name
 * @param {string} email
 * @returns {Object} El usuario creado.
 */
const createUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [name, email]);
  return rows[0];
};

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns {Array} Lista de usuarios.
 */
const getAllUsers = async () => {
  const query = 'SELECT * FROM users ORDER BY created_at DESC;';
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { initUsersTable, createUser, getAllUsers };
