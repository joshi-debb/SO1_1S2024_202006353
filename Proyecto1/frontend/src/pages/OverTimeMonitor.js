
import React from 'react';

import { useState, useEffect } from "react";

import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


function OverTimeMonitor() {
  // Datos simulados para el rendimiento del CPU y la RAM a lo largo del tiempo
  const cpuData = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [30, 40, 35, 50, 45, 60],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.6)', // Color de la línea del gráfico
      },
    ],
  };

  const ramData = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
    datasets: [
      {
        label: 'RAM Usage (MB)',
        data: [500, 550, 600, 580, 620, 650],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.6)', // Color de la línea del gráfico
      },
    ],
  };

  const chartContainerStyle = {
    width: '400px', // Establece el ancho de los contenedores de los gráficos
    height: '300px', // Establece la altura de los contenedores de los gráficos
    margin: '0 10px', // Añade un margen entre los contenedores de los gráficos
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="custom-color">SYSTEM MONITOR SO1_PY1_1S2024</h1>
      </div>
      <div className='content'>
        <div style={chartContainerStyle}>
          <h2>CPU Usage Over Time</h2>
          <Line data={cpuData} />
        </div>
        <div style={chartContainerStyle}>
          <h2>RAM Usage Over Time</h2>
          <Line data={ramData} />
        </div>

      </div>


    </div>
  );
}

export default OverTimeMonitor;
