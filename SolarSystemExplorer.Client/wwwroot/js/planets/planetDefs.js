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
            albedo: '/assets/textures/earth/earth_diffuse.jpg',
            normal: '/assets/textures/earth/earth_normal.jpg',
            spec: '/assets/textures/earth/earth_spec.jpg',
            clouds: '/assets/textures/earth/earth_clouds.png'
        }
    }
];
