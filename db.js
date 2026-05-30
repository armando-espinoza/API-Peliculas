require('dotenv').config();

const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL) {
  throw new Error("FATAL ERROR: DATABASE_URL no está definida en las variables de entorno.");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida con éxito.');
    await sequelize.sync();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
  }
}

conectar();

module.exports = sequelize;
