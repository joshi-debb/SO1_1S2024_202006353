const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = 2024;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));
app.use(express.json()); 

mongoose.connect('mongodb://mongo:27017/DB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

const Persona = mongoose.model('personas', {
  foto: String,
  fecha: Date
});


// Insertar un nuevo persona
app.post('/InsertPersona', async (req, res) => {
  const { foto, fecha} = req.body;

  try {
    const nuevoPersona = new Persona({ foto, fecha });
    await nuevoPersona.save();
    res.status(201).json(nuevoPersona);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar el Persona' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor API en http://localhost:${PORT}`);
});
