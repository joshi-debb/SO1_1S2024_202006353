import './App.css';
import { Cmds } from "../wailsjs/go/main/App";
import { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';

function App() {
    const [result, setResult] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await Cmds();
            setResult(response);
        };

        fetchData(); // Llama a la función fetchData una vez al cargar el componente

        const intervalId = setInterval(fetchData, 500); // Llama a fetchData cada 500ms

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, [result]); // Ejecuta useEffect cada vez que result cambie

    const data = {
        labels: ['Used', 'Free'],
        datasets: [
            {
                label: 'RAM',
                data: [parseInt(result), 100000 - parseInt(result)],
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

    return (
        <div id="App">
            <Doughnut data={data} />
        </div>
    );
}

export default App;
