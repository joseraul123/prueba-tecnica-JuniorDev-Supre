const { createUser, getAllUsers } = require('../models/userModel');

/**
 * POST /users
 * Crea un nuevo usuario con los datos del body (name, email).
 */
const postUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validación básica de campos requeridos
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Los campos "name" y "email" son obligatorios.',
      });
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido.',
      });
    }

    const newUser = await createUser(name.trim(), email.trim().toLowerCase());

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente.',
      data: newUser,
    });
  } catch (error) {
    // Error de email duplicado en PostgreSQL (código 23505)
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario registrado con ese email.',
      });
    }

    console.error('Error al crear el usuario:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor.',
    });
  }
};

/**
 * GET /users
 * Retorna la lista de todos los usuarios registrados.
 */
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor.',
    });
  }
};

module.exports = { postUser, getUsers };
