import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PARTY_COLORS = {
  PP: '#0056a2',
  Vox: '#63BE21',
  PSOE: '#E1001A',
  PSC: '#E1001A',
  Sumar: '#7B3FBE',
  Compromís: '#F97316',
  PNV: '#1D7B40',
  'EH Bildu': '#95C11F',
  Elkarrekin: '#7B3FBE',
  Junts: '#003DA5',
  ERC: '#DA3F1E',
  CUP: '#FACC15',
  BNG: '#005F9E',
  CC: '#FFB612',
  UPN: '#0E7490',
  'Geroa Bai': '#84CC16',
  PRC: '#0891B2',
  FORO: '#6366F1',
  MÉS: '#10B981',
  CPM: '#8B5CF6',
  CHA: '#F59E0B',
  TE: '#78716C',
  UPL: '#06B6D4',
  Otros: '#6B7280',
};

export default function SeatsChart({ escanoActual, escanoRecomendado, recomendacion }) {
  const allParties = new Set([
    ...Object.keys(escanoActual),
    ...Object.keys(escanoRecomendado),
  ]);

  const parties = Array.from(allParties).filter(p => {
    return (escanoActual[p] || 0) > 0 || (escanoRecomendado[p] || 0) > 0;
  }).sort((a, b) => {
    const total = p => (escanoActual[p] || 0) + (escanoRecomendado[p] || 0);
    return total(b) - total(a);
  });

  const data = {
    labels: parties,
    datasets: [
      {
        label: 'Situación actual (votos dispersos)',
        data: parties.map(p => escanoActual[p] || 0),
        backgroundColor: parties.map(p => (PARTY_COLORS[p] || '#6B7280') + 'aa'),
        borderColor: parties.map(p => PARTY_COLORS[p] || '#6B7280'),
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: `Con voto útil (todo a ${recomendacion})`,
        data: parties.map(p => escanoRecomendado[p] || 0),
        backgroundColor: parties.map(p => PARTY_COLORS[p] || '#6B7280'),
        borderColor: parties.map(p => PARTY_COLORS[p] || '#6B7280'),
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#e5e7eb', font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} escaño${ctx.parsed.y !== 1 ? 's' : ''}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#9ca3af', stepSize: 1 },
        grid: { color: '#374151' },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
