'use client'; 
import { useEffect, useState } from 'react';

export default function Home() {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    fetch('/api/plantas')
      .then(res => res.json())
      .then(data => setPlantas(data));
  }, []);

  return (
    <main className="p-10 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Botanic: Paisagismo
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {plantas.map(planta => (
          <div key={planta.id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold text-gray-800">{planta.nome}</h2>
            <p className="text-gray-500 italic text-sm">{planta.nomeCientifico}</p>
            <div className="mt-4 flex gap-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {planta.clima}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {planta.uso}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}