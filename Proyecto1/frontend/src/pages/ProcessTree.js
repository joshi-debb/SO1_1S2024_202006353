import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const datosProcesos = [
  { pid: '1', nombre: 'Proceso A', hijos: ['2', '3'] },
  { pid: '2', nombre: 'Proceso B', hijos: ['4'] },
  { pid: '3', nombre: 'Proceso C', hijos: [] },
  { pid: '4', nombre: 'Proceso D', hijos: [] }
];

const ProcessTree = () => {
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    // Simulación de obtención de datos de procesos del sistema
    setProcesos(datosProcesos);
  }, []);

  const generarArbol = () => {
    // Crear la estructura del árbol con los datos de los procesos
    const arbol = {
      name: 'Proceso A',
      children: [
        {
          name: 'Proceso B',
          children: [
            { name: 'Proceso D' }
          ]
        },
        { name: 'Proceso C' }
      ]
    };

    return arbol;
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree 
        data={generarArbol()} 
        orientation="vertical"
        translate={{ x: 100, y: 250 }}
      />
    </div>
  );
};

export default ProcessTree;



