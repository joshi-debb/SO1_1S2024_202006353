
import React from 'react';

import { useState, useEffect } from "react";

import { Doughnut } from 'react-chartjs-2';
import Chart, { ArcElement, Legend, Tooltip } from 'chart.js/auto';


Chart.register(ArcElement, Tooltip, Legend);



function RealTimeMonitor() {

  const [ramUsage, setRamUsage] = useState('');

  const [cpuUsage, setCpuUsage] = useState({ cpu_used: 0, cpu_free: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpuResponse = await fetch("http://localhost:8000/cpu-usage");
        const cpuData = await cpuResponse.json();
        setCpuUsage(cpuData);
      } catch (error) {
        console.error("Error al consultar el endpoint:", error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    // Limpia el intervalo cuando el componente se desmonta o cuando la función useEffect se ejecuta nuevamente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/ram-usage');
        const data = await response.json();
        setRamUsage(JSON.parse(data));
        // console.log(ramUsage);
      } catch (error) {
        console.error('Error al consultar el endpoint:', error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    // Limpia el intervalo cuando el componente se desmonta o cuando la función useEffect se ejecuta nuevamente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente



  const data = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'RAM',
        data: [parseInt(ramUsage.used), parseInt(ramUsage.free)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const data2 = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'CPU',
        data: [cpuUsage.cpu_used, cpuUsage.cpu_free],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartContainerStyle = {
    //padding top
    padding: '15px',
    width: '400px', // Establece el ancho de las gráficas
    height: '300px', // Establece la altura de las gráficas
    margin: '0 10px', // Añade un margen entre las gráficas
  };

  return (

    <div className="container">
      <div className="navbar2">
        <h1 className="custom-color2">REAL TIME MONITOR</h1>
      </div>
      <div className='graphics-content'>

        <div style={chartContainerStyle}>
          <h2 className="custom-color3">RAM Usage Real Time</h2>
          <Doughnut data={data} />
        </div>

        <div style={chartContainerStyle}>
          <h2 className="custom-color3">CPU Usage Real Time</h2>
          <Doughnut data={data2} />
        </div>


      </div>


    </div>
  );
}






export default RealTimeMonitor;