require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT;
const sequelize = require('./db.js');
const bodyParser = require('body-parser');
const Peliculas = require('./models/peliculas');
const fs = require('fs');
const path = require('path');


app.use(bodyParser.json());

const logger = (req, res, next) =>{
  const log = ` ${new Date().toLocaleString()} - ${req.method} en ${req.url}\n`;
  const ruta = path.join(__dirname, 'log.txt');
  fs.writeFileSync(ruta, log, {flag: 'a'});
  next();
};

app.use(logger);
//Definición de una función que valide la existencia de un registro usando su id 

async function validarPK(id){
  const pelicula = await Peliculas.findByPk(id);
  if (!pelicula){
    const error = new Error('No se encontró la película');
    error.status = 404;
    throw error;
    }
  return pelicula;
}


//Validación de la apikey para que sea una api privada

const validarApiKey = (req, res, next) =>{
  const ApiKey = req.query.key;
  if (ApiKey === process.env.API_KEY){
    next();
  } else{
    res.status(403).json({
      error: 'Acceso prohibido',
      message: 'Se require una API KEY válida'
    });
  }

};


//Endpoints consulta 


//GET Peliculas/
app.get("/Peliculas", async (req,res) =>{
  try{
    const listarPeliculas = await Peliculas.findAll();
    res.json(listarPeliculas)
  }catch(error){
    res.status(500).json({ message: 'Se produjo un error al listar las películas', detalle: error.message });
  }
})

//GET Peliculas/:id 
//Regresa la película de acuerdo a su id

app.get("/Peliculas/:id", async (req,res) =>{
  try{
    const pelicula = await validarPK(req.params.id);
    res.json(pelicula);
  }catch(error){
    res.status(error.status || 500).json({
      message: "Error al obtener la película",
      detalle: error.message
    });
  }
})




//POST Peliculas/ 
//Crea un nuevo registro de película
//Toma como parámetros el nombre de la película, el nombre del director y la fecha de lanzamiento en formato AAAA-MM-DD
app.post("/Peliculas", async (req,res) =>{
  try{
    const { Nombre, Director, Lanzamiento  } = req.body;
    const nuevaPelicula = Peliculas.create({
      Nombre: Nombre,
      Director: Director,
      Lanzamiento: Lanzamiento
    });

    res.status(200).json({
      message: 'Pelicula/s agregada con éxito' 
    });
  }catch(error){
    res.status(500).json({ message: "Se produjo un error con la solicitud", datalle: error.message });
  }
});

//PUT Peliculas/:id
//Actualizar un registro  
app.put("/Peliculas/:id", async (req,res) =>{
  try{
    const pelicula = await validarPK(req.params.id);
    const { Nombre, Director, Lanzamiento } = req.body;
    
    await pelicula.update({
      Nombre,
      Director,
      Lanzamiento
    });

    res.status(200).json({
      message: 'Se actualizó el registro'
    });

  }catch(error){
    res.status(error.status || 500).json({
      message: 'Se produjo un error, no se logró actualizar',
      detalle: error.message
    });
  }
});

//DELETE Peliculas/:id
//Se elimina el registro por completo
app.delete("/Peliculas/:id", async (req,res) =>{
  try{
    const { id } = req.params;
    const pelicula = await Peliculas.findByPk(id);
    await pelicula.destroy();
    res.status(200).json({
      message: 'Se ha eliminado exitosamente el registro'
    });
  }catch(error){
    res.status(error.status || 500).json({
      message: 'No se ha logrado eliminar la película',
      detalle: error.message
    });
  }
});



app.listen(port, () => {
  console.log(`Se ha iniciado el servicio en el puerto ${port}`)
})

