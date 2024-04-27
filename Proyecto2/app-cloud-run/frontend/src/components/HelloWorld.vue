<template>
  <div>
    <button @click="obtenerUltimosIngresos">Update</button>
    <textarea v-model="datos" placeholder="Presiona 'Update' para actualizar Logs" rows="10" cols="110" readonly></textarea>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      datos: ''
    }
  },
  methods: {
    async obtenerUltimosIngresos() {
      try {
        const response = await axios.get('https://backend-apicr-s3wmansxxq-uk.a.run.app/data');

        // const response = await axios.get('http://localhost:8000/data');
        //const response = await axios.get('/api-rest/data');
        this.datos = this.formatoDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los últimos ingresos:', error);
      }
    },
    formatoDatos(data) {
  return data.map(dato => {
    // Imprimir la fecha recibida antes de intentar formatearla
    console.log('Fecha recibida:', dato.timestamp);
    // Convertir la fecha de formato MongoDB a un objeto Date de JavaScript
    const fecha = new Date(dato.timestamp);
    // Formatear la fecha y hora
    const fechaFormateada = fecha.toLocaleString();
    const mensaje = dato.message;
    const datos = JSON.stringify(dato.data);
    return `${fechaFormateada}, ${mensaje}, ${datos}\n`;
  }).join('');
}
  }
}
</script>




