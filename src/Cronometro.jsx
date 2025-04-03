"use client";

import { useState, useEffect } from "react";

function Cronometro() {
  // Estado para el tiempo y el estado de ejecución
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);

  // Efecto para controlar el temporizador
  useEffect(() => {
    let intervalo;

    // Si está activo, incrementa el tiempo cada 10ms
    if (activo) {
      intervalo = setInterval(() => {
        setTiempo((t) => t + 10);
      }, 10);
    }

    // Limpia el intervalo cuando el componente se desmonta o el estado cambia
    return () => clearInterval(intervalo);
  }, [activo]);

  // Formatea el tiempo en minutos:segundos:milisegundos
  const formatearTiempo = () => {
    const minutos = Math.floor(tiempo / 60000);
    const segundos = Math.floor((tiempo % 60000) / 1000);
    const milisegundos = Math.floor((tiempo % 1000) / 10);

    return `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}:${milisegundos.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center mx-auto max-w-xs p-6 border border-gray-200 rounded-lg shadow-sm">
      {/* Pantalla del cronómetro */}
      <div className="text-4xl font-mono font-bold mb-6 tabular-nums">
        {formatearTiempo()}
      </div>

      {/* Botones de control */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setActivo(!activo)}
          className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
            activo
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {activo ? "Pausar" : "Iniciar"}
        </button>

        <button
          onClick={() => {
            setActivo(false);
            setTiempo(0);
          }}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Cronometro;
