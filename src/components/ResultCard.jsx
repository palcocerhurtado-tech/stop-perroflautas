import SeatsChart from './SeatsChart';

const PARTY_STYLE = {
  PP: {
    border: 'border-blue-500',
    bg: 'bg-blue-950/60',
    badge: 'bg-blue-600 hover:bg-blue-500',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_30px_rgba(37,99,235,0.4)]',
    numColor: 'text-blue-400',
  },
  Vox: {
    border: 'border-green-500',
    bg: 'bg-green-950/60',
    badge: 'bg-green-600 hover:bg-green-500',
    text: 'text-green-400',
    glow: 'shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    numColor: 'text-green-400',
  },
};

export default function ResultCard({ provincia, resultado }) {
  const { recomendacion, escanoActual, escanoRecomendado, rightActual, rightOptimo, leftMain } = resultado;
  const ganancia = rightOptimo - rightActual;
  const style = PARTY_STYLE[recomendacion];

  const ppActual = escanoActual.PP || 0;
  const voxActual = escanoActual.Vox || 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">

      {/* Hero recomendación */}
      <div className={`relative rounded-2xl border-2 ${style.border} ${style.bg} ${style.glow} p-8 text-center overflow-hidden`}>
        {/* Línea decorativa top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-es-red via-es-yellow to-es-red" />

        <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mb-2">
          {provincia.comunidad} · {provincia.nombre} · {provincia.escanos} escaños
        </p>

        <p className="text-zinc-300 text-lg mb-4">
          El voto útil de la derecha es:
        </p>

        <div className={`inline-block px-10 py-4 rounded-2xl text-4xl font-black tracking-wider ${style.badge} transition-colors`}>
          VOTA {recomendacion.toUpperCase()}
        </div>

        {ganancia > 0 && (
          <p className={`mt-4 text-sm ${style.text} font-semibold`}>
            ↑ {ganancia} escaño{ganancia > 1 ? 's' : ''} más para el bloque PP+Vox
          </p>
        )}
      </div>

      {/* Comparativa escaños */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 rounded-xl p-5 text-center border border-zinc-700">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Sin voto útil</p>
          <p className="text-5xl font-black text-red-500">{rightActual}</p>
          <p className="text-zinc-600 text-xs mt-2">PP: {ppActual} · Vox: {voxActual}</p>
        </div>
        <div className={`rounded-xl p-5 text-center border-2 ${style.border} ${style.bg}`}>
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Con voto útil</p>
          <p className={`text-5xl font-black ${style.numColor}`}>{rightOptimo}</p>
          <p className="text-zinc-500 text-xs mt-2">
            {ganancia > 0 ? `+${ganancia} escaño${ganancia > 1 ? 's' : ''} extra` : 'Resultado idéntico'}
          </p>
        </div>
      </div>

      {/* Explicación */}
      <div className="relative bg-zinc-900 rounded-xl p-5 border border-zinc-700 text-sm text-zinc-300 leading-relaxed overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-es-red to-es-yellow rounded-l-xl" />
        <div className="pl-3">
          {ganancia > 0 ? (
            <>
              <span className="font-bold text-white">¿Por qué {recomendacion}?</span>{' '}
              Concentrando el voto de la derecha en <strong className={style.text}>{recomendacion}</strong>,
              el bloque PP+Vox pasa de <strong className="text-red-400">{rightActual}</strong> a{' '}
              <strong className={style.numColor}>{rightOptimo}</strong> escaños en {provincia.nombre}.
              {leftMain && (
                <> Evita que <strong className="text-red-400">{leftMain}</strong> se lleve ese escaño
                por la división del voto patriota.</>
              )}
            </>
          ) : (
            <>
              <span className="font-bold text-white">Voto útil indistinto.</span>{' '}
              Tanto PP como Vox producen el mismo resultado ({rightOptimo} escaños) en {provincia.nombre}.
              Se recomienda <strong className={style.text}>{recomendacion}</strong> como partido
              con mayor respaldo estimado en esta provincia.
            </>
          )}
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.15em] mb-5">
          Distribución de escaños · Actual vs. Voto Útil
        </h3>
        <SeatsChart
          escanoActual={escanoActual}
          escanoRecomendado={escanoRecomendado}
          recomendacion={recomendacion}
        />
      </div>

      {/* Datos base */}
      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
        <p className="text-xs text-zinc-600 uppercase tracking-wider mb-3">
          Estimación de voto · Base del cálculo
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(provincia.votos)
            .filter(([, v]) => v > 0)
            .sort(([, a], [, b]) => b - a)
            .map(([partido, pct]) => (
              <span
                key={partido}
                className="bg-zinc-800 text-zinc-400 text-xs px-2.5 py-1 rounded-full border border-zinc-700"
              >
                {partido} <span className="text-zinc-300 font-semibold">{pct.toFixed(1)}%</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
