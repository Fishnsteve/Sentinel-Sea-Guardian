/**
 * Environmental Scaling: Wind-Wave Power Law (SWH = a * U^b)
 * SWH = Significant Wave Height (m)
 * U = Wind Speed (m/s)
 * a, b = Empirical scaling factors
 */
export function calculateSWH(windSpeed: number, a = 0.015, b = 2): number {
  return a * Math.pow(windSpeed, b);
}

/**
 * Optical Flow Simulation for Acceleration Vectors
 */
export interface FlowVector {
  x: number;
  y: number;
  magnitude: number;
  direction: 'onshore' | 'offshore' | 'parallel';
}

export function simulateRipCurrentFlow(x: number, y: number): FlowVector {
  // Simplified logic for demo: certain regions have offshore vectors
  const isRipZone = x > 0.4 && x < 0.6;
  const magnitude = isRipZone ? Math.random() * 2 + 1.5 : Math.random() * 0.5;
  
  return {
    x,
    y,
    magnitude,
    direction: isRipZone ? 'offshore' : 'onshore'
  };
}
