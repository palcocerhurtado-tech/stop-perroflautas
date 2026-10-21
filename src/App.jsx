import { useState, useMemo } from 'react';
import ProvinceSelector from './components/ProvinceSelector';
import ResultCard from './components/ResultCard';
import provinciasData from './data/provincias.json';
import { calcularVotoUtil } from './utils/dhondt';

export default function App() {
  const [selectedProvince, setSelectedProvince] = useState('');

  const provincia = useMemo(
    () => provinciasData.provincias.find(p => p.nombre === selectedProvince) || null,
    [selectedProvince]
  );

  const resultado = useMemo(
    () => (provincia ? calcularVotoUtil(provincia) : null),
    [provincia]
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Franja bandera top */}
      <div className="h-2 flag-stripe" />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950" />
        <div className="relative max-w-3xl mx-auto px-4 py-10 text-center">

          {/* Escudo emoji + título */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-5xl">🇪🇸</span>
            <div>
              <h1 className="text-5xl font-black tracking-tight leading-none">
                <span className="text-white">STOP </span>
                <span className="text-es-red">PERRO</span><span className="text-es-yellow">FLAUTAS</span>
              </h1>
            </div>
            <span className="text-5xl">🇪🇸</span>
          </div>

          <p className="text-zinc-400 text-sm mt-1 tracking-widest uppercase">
            Calculadora de voto útil · Elecciones Generales 29-N 2026
          </p>

          {/* Subtítulo */}
          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Algoritmo Ley d'Hondt · 52 circunscripciones · Sin tracking
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Intro */}
        <div className="relative rounded-2xl border border-zinc-700 bg-zinc-900/60 backdrop-blur p-6 text-center overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-es-red via-es-yellow to-es-red" />
          <p className="text-zinc-300 text-base leading-relaxed">
            ¿Tu voto de derechas va a acabar en la basura por culpa de la dispersión?{' '}
            <strong className="text-white">Descubre si tienes que votar{' '}
            <span className="text-blue-400">PP</span> o <span className="text-green-400">Vox</span>{' '}
            para que el bloque saque el máximo de escaños</strong> en tu provincia.
          </p>
        </div>

        {/* Selector */}
        <ProvinceSelector selected={selectedProvince} onChange={setSelectedProvince} />

        {/* Resultado */}
        {resultado && provincia && (
          <ResultCard provincia={provincia} resultado={resultado} />
        )}

        {!selectedProvince && (
          <div className="text-center py-12">
            <div className="text-7xl mb-4">🗳️</div>
            <p className="text-zinc-600 text-lg">Selecciona tu provincia arriba</p>
            <p className="text-zinc-700 text-sm mt-1">El algoritmo calculará tu voto más eficiente</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="h-1 flag-stripe opacity-40" />
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <p className="text-zinc-600 text-xs leading-relaxed max-w-xl mx-auto">
            ⚠️ <strong className="text-zinc-500">Aviso legal:</strong> Simulación basada en estimaciones
            electorales y la Ley d'Hondt. No es una predicción oficial. Los datos son extrapolaciones
            de resultados previos y encuestas de octubre de 2026. La decisión final de voto es tuya.
          </p>
          <p className="text-zinc-700 text-xs mt-3">
            Código abierto · Sin cookies · Sin backend · Hecho en España 🇪🇸
          </p>
        </div>
      </footer>
    </div>
  );
}
