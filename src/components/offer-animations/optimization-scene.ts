export const OPTIMIZATION_FLIGHT_DURATION_MS = 2200;
export const OPTIMIZATION_TYPING_DELAY_MS = 18;
export const OPTIMIZATION_RESULTS_DELAY_MS = 280;
export const OPTIMIZATION_FLIGHT_DELAY_MS = 440;

export type OptimizationScene = { typedLength: number; resultsVisible: boolean; flightStarted: boolean; rank: number; complete: boolean };

export function getOptimizationScene(elapsedMs: number, queryLength: number): OptimizationScene {
  const resultsStart = queryLength * OPTIMIZATION_TYPING_DELAY_MS + OPTIMIZATION_RESULTS_DELAY_MS;
  const flightStart = resultsStart + OPTIMIZATION_FLIGHT_DELAY_MS;
  const flightProgress = Math.min(1, Math.max(0, (elapsedMs - flightStart) / OPTIMIZATION_FLIGHT_DURATION_MS));
  return {
    typedLength: Math.min(queryLength, Math.max(0, Math.floor(elapsedMs / OPTIMIZATION_TYPING_DELAY_MS))),
    resultsVisible: elapsedMs >= resultsStart,
    flightStarted: elapsedMs >= flightStart,
    rank: 20 - Math.round(flightProgress * 19),
    complete: flightProgress === 1,
  };
}
