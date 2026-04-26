const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');


const Peliculas = sequelize.define( 'Peliculas',{
  id:{
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
 },
 Nombre: {
   type: DataTypes.STRING
 },
 Director:{
   type: DataTypes.STRING
 },
 Lanzamiento:{
   type: DataTypes.DATEONLY
 }
},{
  tableName: 'Peliculas',
  timestamps: true
}); 

module.exports = Peliculas;
