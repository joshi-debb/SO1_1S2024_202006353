import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

function RealTimeMonitor() {
  const [ramUsage, setRamUsage] = useState({ used: 0, free: 0 });
  const [cpuUsage, setCpuUsage] = useState({ cpuUsed: 0, cpuFree: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const cpuResponse = await fetch("http://localhost:8000/cpu-usage");
        const cpuResponse = await fetch("/cpu-usage");

        const cpuData = await cpuResponse.json();
        setCpuUsage(JSON.parse(cpuData));
        // console.log(cpuUsage.cpu_usage);
      } catch (error) {
        console.error("Error al consultar el endpoint CPU:", error);
      }

      try {
        //const ramResponse = await fetch("http://localhost:8000/ram-usage");
        const ramResponse = await fetch("/ram-usage");
        const ramData = await ramResponse.json();
        setRamUsage(JSON.parse(ramData));
        // console.log(ramUsage.used);
      } catch (error) {
        console.error("Error al consultar el endpoint RAM:", error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    // Limpia el intervalo cuando el componente se desmonta o cuando la función useEffect se ejecuta nuevamente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

  const ramData = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'RAM',
        data: [ramUsage.used, ramUsage.free],
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

  const cpuData = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'CPU',
        data: [cpuUsage.cpu_usage, 1-cpuUsage.cpu_usage],
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
    padding: '15px',
    width: '400px',
    height: '300px',
    margin: '0 10px',
  };

  return (
    <div className="container">
      <div className="navbar2">
        <h1 className="custom-color2">REAL TIME MONITOR</h1>
      </div>
      <div className='graphics-content'>
        <div style={chartContainerStyle}>
          <h2 className="custom-color3">RAM Usage Real Time</h2>
          <Doughnut data={ramData} />
        </div>
        <div style={chartContainerStyle}>
          <h2 className="custom-color3">CPU Usage Real Time</h2>
          <Doughnut data={cpuData} />
        </div>
      </div>
    </div>
  );
}

export default RealTimeMonitor;
