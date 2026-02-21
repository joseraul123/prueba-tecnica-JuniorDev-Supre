# API REST – Gestión de Usuarios

API desarrollada en **Node.js** con **Express** y persistencia en **PostgreSQL**, construida como solución a la prueba técnica para el cargo de Desarrollador Junior.

---

## Tecnologías utilizadas

- **Node.js** – Entorno de ejecución JavaScript del lado del servidor
- **Express** – Framework web para Node.js
- **PostgreSQL** – Base de datos relacional
- **pg** – Cliente PostgreSQL para Node.js
- **dotenv** – Manejo de variables de entorno

---

## Estructura del proyecto

```
├── src/
│   ├── config/
│   │   └── database.js        # Configuración y pool de conexión a PostgreSQL
│   ├── controllers/
│   │   └── userController.js  # Lógica de negocio de los endpoints
│   ├── models/
│   │   └── userModel.js       # Consultas SQL (creación de tabla y CRUD)
│   ├── routes/
│   │   └── userRoutes.js      # Definición de rutas de la API
│   └── app.js                 # Configuración de Express y middlewares
├── server.js                  # Punto de entrada del servidor
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/) v14 o superior

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-tecnica-JuniorDev-Supre
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos en PostgreSQL

Abre tu cliente de PostgreSQL (psql, pgAdmin, etc.) y ejecuta:

```sql
CREATE DATABASE prueba_tecnica;
```

> La tabla `users` se crea **automáticamente** al iniciar el servidor. No es necesario ejecutar ningún script SQL adicional.

### 4. Configurar las variables de entorno

Copia el archivo de ejemplo y edítalo con tus credenciales:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=prueba_tecnica
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
```

---

## Ejecución

### Modo producción

```bash
npm start
```

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## Endpoints disponibles

### `GET /`
Verifica que la API esté funcionando.

**Respuesta:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "endpoints": {
    "POST /users": "Crear un usuario",
    "GET /users": "Listar todos los usuarios"
  }
}
```

---

### `POST /users`
Crea un nuevo usuario.

**Body (JSON):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente.",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
}
```

**Errores posibles:**

| Código | Descripción |
|--------|-------------|
| `400`  | Campos requeridos faltantes o email con formato inválido |
| `409`  | Ya existe un usuario con ese email |
| `500`  | Error interno del servidor |

---

### `GET /users`
Retorna la lista de todos los usuarios registrados.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 2,
      "name": "María García",
      "email": "maria@ejemplo.com",
      "created_at": "2025-01-02T00:00:00.000Z"
    },
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "created_at": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```
