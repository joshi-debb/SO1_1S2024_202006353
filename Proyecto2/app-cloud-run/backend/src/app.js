const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Conexión a la base de datos MongoDB
// mongoose.connect('mongodb://mongodb:27017/ejemplo_database', {
mongoose.connect('mongodb://34.41.68.81:27017/so1py2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a la base de datos.');
}).catch(err => {
  console.error('Error de conexión a la base de datos:', err);
  process.exit(1);
});

app.use(cors()); 
app.use(bodyParser.json());

// Definir el esquema y el modelo de ejemplo
const Schema = mongoose.Schema;
const ExampleSchema = new Schema({
  log: String
});
const ExampleModel = mongoose.model('bands', ExampleSchema);

// Ruta para ingresar un nuevo dato

app.post("/postear", async (req, res) => {
    try {
      // Crea un nuevo documento en la colección "ejemplos" con el campo "log" igual al valor recibido en la petición
      const nuevoIngreso = new ExampleModel({ log: req.body.log });
      await nuevoIngreso.save();
      res.json({ mensaje: "Ingreso exitoso" });
    } catch (error) {
      res.status(500).json({ error: "Error al ingresar el dato" });
    }
  }

);

// Ruta para obtener los últimos 20 datos ingresados
app.get("/data", async (req, res) => {
    try {
      // Encuentra los últimos 20 documentos en la colección "ejemplos" ordenados por el campo "_id" en orden descendente
      const ultimosIngresos = await ExampleModel.find().sort({ _id: -1 }).limit(20);
      res.json(ultimosIngresos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los últimos ingresos" });
    }
  });
  
//hola mundo
app.get("/", (req, res) => {
    res.send("Hola mundo");
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

//npm install express mongoose
//npm install cors
//npm install body-parser
//npm install -g nodemon
//nodemon src/app.js