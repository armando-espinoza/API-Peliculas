const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

async function conectar(){
  try{
    await sequelize.authenticate();
    console.log('Base de datos conectada');
    await sequelize.sync();
  }
  catch(error){
    console.error( 'No se ha logrado conectar la base de datos' );
  }
}

conectar();

module.exports = sequelize;



