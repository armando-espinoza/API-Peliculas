
# API REST de Películas

Esta es una API RESTful para la gestión de un catálogo de películas, construida con Node.js, Express, Sequelize y SQLite.

---

## Características

* CRUD Completo: Listar, obtener, crear, actualizar y eliminar películas.
* Base de Datos: Persistencia utilizando Sequelize y SQLite.
* Middleware para validación de API Key.

---

## Tecnologías Utilizadas

* Node.js / Express
* Sequelize (ORM)
* SQLite3

---

---

## Endpoints

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/peliculas` | Listar todos los registros |
| **GET** | `/peliculas/:id` | Obtener un registro |
| **POST** | `/peliculas` | Crear un registro |
| **PUT** | `/peliculas/:id` | Actualizar un registro |
| **DELETE** | `/peliculas/:id` | Eliminar un registro |

---

---

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Crear un archivo `.env` basado en `.env.example`.
4. Iniciar con `node server.js`.
