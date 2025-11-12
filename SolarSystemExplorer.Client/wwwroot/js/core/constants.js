// core/constants.js
export const KM = 1;
export const AU = 149_600_000 * KM;
export const DISTANCESCALE = 1 / 500_000;  // 149,600,000 / 2,500,000 ≈ 59.84

// Make planets comfortably big (Earth radius ≈ 12.7 units)
export const SIZESCALE = 1 / 500;

// Never draw smaller than this (Mercury, Moon, etc.)
export const MIN_RADIUS_UNITS = 3.0;

export const TEX_BASE = '/assets/textures';
