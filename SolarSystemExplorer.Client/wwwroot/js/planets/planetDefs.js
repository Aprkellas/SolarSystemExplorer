import { AU } from '../core/constants.js';

export const presetPlanets = [
    {
        key: 'sun',
        name: 'Sun',
        type: 'star',
        radiusKm: 696_340,
        textures: { albedo: '/assets/textures/sun/sun.jpg' }
    },
    {
        key: 'earth',
        name: 'Earth',
        radiusKm: 6_371,
        distanceKm: AU,
        orbitPeriodDays: 365,
        rotationHours: 24,
        textures: {
            normal: '/assets/textures/earth/earth.jpg',
        }
    },
    {
        key: 'mercury',
        name: 'Mercury',
        radiusKm: 2_439.7,
        distanceKm: 0.39 * AU,
        orbitPeriodDays: 88,
        rotationHours: 1407.6,
        textures: {
            normal: '/assets/textures/mercury/mercury.jpg'
        }
    },

    // ♀ VENUS
    {
        key: 'venus',
        name: 'Venus',
        radiusKm: 6_051.8,
        distanceKm: 0.72 * AU,
        orbitPeriodDays: 225,
        rotationHours: -5832.5, // retrograde rotation
        textures: {
            normal: '/assets/textures/venus/venus.jpg',
        }
    },
    {
        key: 'moon',
        name: 'Moon',
        radiusKm: 1_737.4,
        distanceKm: 0.00257 * AU, 
        orbitPeriodDays: 27.3,
        rotationHours: 655.7,
        parent: 'earth', 
        textures: {
            normal: '/assets/textures/moon/moon.jpg'
        }
    },
    {
        key: 'mars',
        name: 'Mars',
        radiusKm: 3_389.5,
        distanceKm: 1.52 * AU,
        orbitPeriodDays: 687,
        rotationHours: 24.6,
        textures: {
            normal: '/assets/textures/mars/mars.jpg',
        }
    },
    {
        key: 'jupiter',
        name: 'Jupiter',
        radiusKm: 69_911,
        distanceKm: 5.20 * AU,
        orbitPeriodDays: 4331,
        rotationHours: 9.9,
        textures: {
            normal: '/assets/textures/jupiter/jupiter.jpg'
        }
    },
    {
        key: 'saturn',
        name: 'Saturn',
        radiusKm: 58_232,
        distanceKm: 9.58 * AU,
        orbitPeriodDays: 10_747,
        rotationHours: 10.7,
        textures: {
            normal: '/assets/textures/saturn/saturn.jpg',
            rings: '/assets/textures/saturn/saturn_ring.png'
        }
    },
    {
        key: 'uranus',
        name: 'Uranus',
        radiusKm: 25_362,
        distanceKm: 19.2 * AU,
        orbitPeriodDays: 30_589,
        rotationHours: -17.2, 
        textures: {
            normal: '/assets/textures/uranus/uranus.jpg'
        }
    },
    {
        key: 'neptune',
        name: 'Neptune',
        radiusKm: 24_622,
        distanceKm: 30.05 * AU,
        orbitPeriodDays: 59_800,
        rotationHours: 16.1,
        textures: {
            normal: '/assets/textures/neptune/neptune.jpg'
        }
    }
];
