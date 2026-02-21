const { Router } = require('express');
const { postUser, getUsers } = require('../controllers/userController');

const router = Router();

// POST /users - Crear un usuario
router.post('/', postUser);

// GET /users - Listar todos los usuarios
router.get('/', getUsers);

module.exports = router;
