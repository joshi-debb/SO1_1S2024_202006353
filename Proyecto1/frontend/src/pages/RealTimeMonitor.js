
import React from 'react';

import { useState, useEffect } from "react";

import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


function RealTimeMonitor() {

  // const [result, setResult] = useState('');

  //   useEffect(() => {
  //       const fetchData = async () => {
  //           // const response = await Cmds();
  //           // setResult(response);
  //       };

  //       fetchData(); // Llama a la función fetchData una vez al cargar el componente

  //       const intervalId = setInterval(fetchData, 500); // Llama a fetchData cada 500ms

  //       return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  //   }, [result]); // Ejecuta useEffect cada vez que result cambie

  const data = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'RAM',
        data: [1000, 1000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'RAM',
        data: [102, 1000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
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