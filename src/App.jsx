import { useState, useRef } from "react";

function App() {
  //Se crean las variables de estados las cuales se van a modificar
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [times, setTimes] = useState([]); 
  const intervalRef = useRef(null);
//se crean las funciones de los botones para su respectivo caso
  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    //utilizamos la referencia de la variable para poder limpiar el intervalo y que no se acumulen
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    if (startTime !== null && now !== null) {
      // Calculamos el tiempo transcurrido y lo agregamos a la lista de tiempos
      const elapsed = ((now - startTime) / 1000).toFixed(3);
      // Agregar el tiempo a la lista de tiempos
      setTimes((prevTimes) => [...prevTimes, elapsed]); 
    }
  }

  let secondsPassed = 0;
  // Calculamos los segundos transcurridos
  if (startTime !== null && now !== null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div className="container mx-auto text-center bg-linear-65 from-purple-500 to-pink-500 p-4 my-10 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold">Cronómetro React</h1>
      <h2 className="mt-4 text-xl font-medium text-white">{secondsPassed.toFixed(3)}</h2>
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
          Pausar
        </button>
      </div>

      <h2 className="mt-4 text-xl font-medium ">Tiempos Registrados</h2>
      <ul className="mt-2 text-lg">
        {times.length === 0 ? (
          <li className="text-gray-300">No hay tiempos registrados</li>
        ) : null}
        {times.map((time, index) => (
          <li key={index} className="text-gray-200">{`Intento ${
            index + 1
          }: ${time}s`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
