import { React, useState, useRef } from "react";
import "./App.css";

function App() {
  // se crea el estado de iniciar el tiempo, el tiempo ahora y una referencia para guardar el tiempo todas con valor null
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);
  //Se crea una funcion para inicializar el tiempo y se guarda en el estado de tiempo ahora
  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    // se crea un intervalo para actualizar el tiempo ahora cada segundo y se guarda en la referencia intervalRef
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }
  //se crea una funcion para detener el tiempo y se limpia la referencia intervalRef
  function handleStop() {
    clearInterval(intervalRef.current);
  }
  //se calcula el tiempo transcurrido en segundos y se muestra en pantalla
  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }
  return (
    <div className="container mx-auto text-center bg-cyan-200 p-4 my-10 rounded-lg shadow-lg">
      {/* se muestra el tiempo transcurrido en pantalla y dos botones para iniciar y detener el tiempo */}
      <h1 className="text-4xl font-bold ">Cronómetro React</h1>
      <h2 className="mt-4 text-xl font-medium">{secondsPassed.toFixed(3)}</h2>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="bg-green-400 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded"
          onClick={handleStart}
        >
          Iniciar
        </button>
        <button
          className="bg-red-400 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
          onClick={handleStop}
        >
          Parar
        </button>
      </div>
    </div>
  );
}

export default App;
