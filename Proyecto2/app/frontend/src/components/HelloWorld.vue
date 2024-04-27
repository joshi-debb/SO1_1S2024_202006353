<template>
  <div>
    <button @click="obtenerUltimosIngresos">Update</button>
    <textarea v-model="datos" rows="10" cols="50" readonly></textarea>
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
        const response = await axios.get('http://localhost:5000/data');
        //const response = await axios.get('/api-rest/data');
        this.datos = this.formatoDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los últimos ingresos:', error);
      }
    },
    formatoDatos(data) {
      return data.map(dato => `> ${JSON.stringify(dato.log)}\n`).join('');
    }
  }
}
</script>
