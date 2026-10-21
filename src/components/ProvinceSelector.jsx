import provinciasData from '../data/provincias.json';

const COMUNIDADES_ORDER = [
  'Comunidad de Madrid',
  'Andalucía',
  'Cataluña',
  'Comunitat Valenciana',
  'Castilla y León',
  'Castilla-La Mancha',
  'País Vasco',
  'Galicia',
  'Aragón',
  'Extremadura',
  'Canarias',
  'Región de Murcia',
  'Navarra',
  'Asturias',
  'La Rioja',
  'Cantabria',
  'Islas Baleares',
  'Ceuta',
  'Melilla',
];

export default function ProvinceSelector({ selected, onChange }) {
  const grouped = {};
  provinciasData.provincias.forEach(p => {
    if (!grouped[p.comunidad]) grouped[p.comunidad] = [];
    grouped[p.comunidad].push(p);
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-[0.2em]">
        Tu provincia
      </label>
      <div className="relative">
        <select
          value={selected}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-zinc-900 border-2 border-zinc-700 text-white rounded-xl px-4 py-3.5 text-base
                     focus:outline-none focus:border-es-yellow focus:ring-0
                     appearance-none cursor-pointer transition-colors"
        >
          <option value="">— Elige tu provincia —</option>
          {COMUNIDADES_ORDER.filter(c => grouped[c]).map(comunidad => (
            <optgroup key={comunidad} label={`▸ ${comunidad}`}>
              {grouped[comunidad].map(p => (
                <option key={p.nombre} value={p.nombre}>
                  {p.nombre}  ({p.escanos} escaños)
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {/* Flecha custom */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-es-yellow">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
