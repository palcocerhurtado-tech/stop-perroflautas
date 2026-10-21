/**
 * Ley d'Hondt — asigna escaños a partidos según sus votos.
 * @param {Object} votes  - { partido: porcentajeVotos }
 * @param {number} seats  - número de escaños a repartir
 * @returns {Object}      - { partido: escañosAsignados }
 */
export function dhondt(votes, seats) {
  const parties = Object.keys(votes).filter(p => votes[p] > 0);
  const result = {};
  parties.forEach(p => (result[p] = 0));

  const quotients = [];
  parties.forEach(party => {
    for (let divisor = 1; divisor <= seats; divisor++) {
      quotients.push({ party, value: votes[party] / divisor });
    }
  });

  quotients.sort((a, b) => b.value - a.value);

  for (let i = 0; i < seats; i++) {
    if (quotients[i]) result[quotients[i].party]++;
  }

  return result;
}

/**
 * Calcula la recomendación de voto útil para una provincia.
 * Prueba dos escenarios: todos los votos de derecha van a PP o a Vox.
 * @param {Object} provincia - objeto de datos de la provincia
 * @returns {Object} resultado con recomendación, escaños por escenario y textos
 */
export function calcularVotoUtil(provincia) {
  const { votos, escanos } = provincia;

  // Distribución actual
  const escanoActual = dhondt(votos, escanos);
  const rightActual = (escanoActual.PP || 0) + (escanoActual.Vox || 0);

  const rightVotes = (votos.PP || 0) + (votos.Vox || 0);
  const leftMain = findLeftLeader(votos);

  // Escenario A: todos los votos de derecha al PP
  const votosA = { ...votos, PP: rightVotes, Vox: 0 };
  const escanoA = dhondt(votosA, escanos);
  const rightA = (escanoA.PP || 0); // Vox tiene 0

  // Escenario B: todos los votos de derecha a Vox
  const votosB = { ...votos, PP: 0, Vox: rightVotes };
  const escanoB = dhondt(votosB, escanos);
  const rightB = (escanoB.Vox || 0); // PP tiene 0

  let recomendacion, ganancia, perdida;

  if (rightA > rightB) {
    recomendacion = 'PP';
    ganancia = rightA;
    perdida = rightActual;
  } else if (rightB > rightA) {
    recomendacion = 'Vox';
    ganancia = rightB;
    perdida = rightActual;
  } else {
    // Empate: recomendar al partido con más votos en la provincia
    recomendacion = (votos.PP || 0) >= (votos.Vox || 0) ? 'PP' : 'Vox';
    ganancia = rightA;
    perdida = rightActual;
  }

  // Escenario recomendado para el gráfico
  const escanoRecomendado = recomendacion === 'PP' ? escanoA : escanoB;

  return {
    recomendacion,
    escanoActual,
    escanoRecomendado,
    rightActual,
    rightOptimo: ganancia,
    maxPosible: Math.max(rightA, rightB),
    escaños: {
      A: rightA,
      B: rightB,
    },
    leftMain,
  };
}

function findLeftLeader(votos) {
  const leftParties = ['PSOE', 'Sumar', 'PSC', 'ERC', 'Junts', 'PNV', 'EH Bildu', 'BNG', 'CC', 'Compromís'];
  let leader = null;
  let max = 0;
  leftParties.forEach(p => {
    if ((votos[p] || 0) > max) {
      max = votos[p];
      leader = p;
    }
  });
  return leader;
}
