# ⛔ Stop Perroflautas

Calculadora de **voto útil** para maximizar los escaños del bloque PP+Vox en las elecciones generales españolas del **29-N 2026**, usando la Ley d'Hondt.

## ¿Qué hace?

Para cada una de las **52 circunscripciones** (50 provincias + Ceuta + Melilla), el algoritmo:

1. Simula el reparto actual de escaños con votos dispersos (PP y Vox compiten entre sí).
2. Prueba el **Escenario A**: todos los votantes de derechas vota PP.
3. Prueba el **Escenario B**: todos los votantes de derechas vota Vox.
4. Compara el total de escaños PP+Vox en cada escenario y recomienda el partido que maximiza ese total.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Cómo construir para producción

```bash
npm run build
```

El resultado queda en `dist/`. Puedes desplegarlo en GitHub Pages, Vercel o cualquier servidor estático.

## Fuente de los datos

Los datos de `src/data/provincias.json` son **estimaciones estáticas** basadas en:

- Resultados de las elecciones generales de **julio de 2023**.
- Tendencias de las elecciones europeas de **junio de 2024**.
- Extrapolación provincial de encuestas de **octubre de 2026** (Sigma Dos, El Debate, Metroscopia).
- Real Decreto **806/2026**: Madrid pasa de 37 a 38 escaños; Cádiz de 9 a 8.

> ⚠️ Los datos son aproximados. Para uso educativo y de simulación. No son resultados ni predicciones oficiales.

## Stack técnico

- **React 18** + **Vite**
- **Tailwind CSS 3**
- **Chart.js** + **react-chartjs-2**
- Sin backend · Sin base de datos · Sin tracking

## Licencia

MIT
