require('dotenv').config();
const app = require('./src/app');
const { initUsersTable } = require('./src/models/userModel');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Inicializar la tabla de usuarios al arrancar
    await initUsersTable();
    console.log('Tabla "users" verificada/creada correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
