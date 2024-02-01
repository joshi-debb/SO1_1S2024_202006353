import { useState } from 'react';
import './css/App.css';

function App() {
  const [datos, setDatos] = useState('');
  const [estado, setEstado] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setDatos(data.message);
      setEstado(true);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
        <h1 className='texto1'>TAREA1 - SO1 - 1S2024</h1>
        <button className='buttons' onClick={fetchData}>
          Mostrar Datos
        </button>
        {estado && <p className='texto2'>{datos}</p>}
    </div>
  );
}

export default App;
