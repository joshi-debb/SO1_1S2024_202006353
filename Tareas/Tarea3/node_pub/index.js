
const Redis = require('ioredis');

const conexion = new Redis({
    host: '10.99.162.155',
    port: 6379,
    connectTimeout: 5000,
});

function functionPub(){

    const mensaje = {
        msg: "Hola a todos"
    };

    conexion.publish('test', JSON.stringify(mensaje)) // Convertir objeto a cadena JSON
    .then(() => {
        console.log('Mensaje enviado');
    })
    .catch((err) => {
        console.error('Error al enviar mensaje:', err);
    });

}

setInterval(functionPub, 3000);
