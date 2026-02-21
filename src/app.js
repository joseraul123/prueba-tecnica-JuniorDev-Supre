const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para parsear JSON en el body
app.use(express.json());

// Ruta de salud del servidor
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    endpoints: {
      'POST /users': 'Crear un usuario',
      'GET /users': 'Listar todos los usuarios',
    },
  });
});

// Rutas de usuarios
app.use('/users', userRoutes);

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.method} ${req.originalUrl} no encontrada.`,
  });
});

// Middleware de manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.message);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor.',
  });
});

module.exports = app;
