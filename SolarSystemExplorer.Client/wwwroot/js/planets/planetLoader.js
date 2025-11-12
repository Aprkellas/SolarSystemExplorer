// planets/planetLoader.js
import * as THREE from '/lib/three/three.module.min.js';
import { getScene } from '../core/sceneHost.js';
import { textureLoader } from '../core/loaders.js';
import { SCALE } from '../core/constants.js';
import { onFrame } from '../core/update.js';

const planets = new Map(); // key -> { group, mesh, rotSpeed, orbitSpeed, angle }

export function loadPresetPlanets(defs) {
    defs.forEach(addPlanet);
}

export function addPlanet(def) {
    const scene = getScene();
    const group = new THREE.Group();
    scene.add(group);

    if (def.type === 'star') {
        // emissive sun mesh + point light
        const tex = def.textures?.albedo ? textureLoader.load(def.textures.albedo) : null;
        const sun = new THREE.Mesh(
            new THREE.SphereGeometry(def.radiusKm * SCALE, 64, 64),
            new THREE.MeshBasicMaterial({ map: tex })
        );
        group.add(sun);
        const light = new THREE.PointLight(0xffffff, 4, 0, 2);
        group.add(light);
        planets.set(def.key, { group, mesh: sun, rotSpeed: 0, orbitSpeed: 0, angle: 0 });
        return;
    }

    // regular planet
    const mat = new THREE.MeshStandardMaterial({
        map: def.textures?.albedo ? textureLoader.load(def.textures.albedo) : null,
        normalMap: def.textures?.normal ? textureLoader.load(def.textures.normal) : null,
        roughness: 1, metalness: 0
    });
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(def.radiusKm * SCALE, 64, 64),
        mat
    );
    sphere.name = def.name ?? def.key;
    sphere.position.set((def.distanceKm || 0) * SCALE, 0, 0);
    group.add(sphere);

    // optional clouds
    if (def.textures?.clouds) {
        const clouds = new THREE.Mesh(
            new THREE.SphereGeometry(def.radiusKm * SCALE * 1.01, 64, 64),
            new THREE.MeshStandardMaterial({
                map: textureLoader.load(def.textures.clouds),
                transparent: true,
                depthWrite: false
            })
        );
        group.add(clouds);
    }

    const orbitSpeed = def.orbitPeriodDays ? (2 * Math.PI) / def.orbitPeriodDays : 0;
    const rotSpeed = (2 * Math.PI) / (def.rotationHours || 24);
    planets.set(def.key, { group, mesh: sphere, rotSpeed, orbitSpeed, angle: 0 });
}

// remove a planet and free GPU memory
export function removePlanet(key) {
    const p = planets.get(key);
    if (!p) return;
    p.group.parent?.remove(p.group);
    disposeObject(p.group);
    planets.delete(key);
}

// single updater for all planets
const ORBIT_SCALE = 0.002;
const ROTATE_SCALE = 0.02;
onFrame.add(() => {
    for (const p of planets.values()) {
        if (p.orbitSpeed) {
            p.angle += p.orbitSpeed * ORBIT_SCALE;
            p.group.rotation.y = p.angle;
        }
        if (p.mesh) {
            p.mesh.rotation.y += p.rotSpeed * ROTATE_SCALE;
        }
    }
});

// — helpers —
function disposeObject(obj) {
    obj.traverse(n => {
        if (n.isMesh) {
            n.geometry?.dispose?.();
            const mats = Array.isArray(n.material) ? n.material : [n.material];
            mats.forEach(m => {
                if (!m) return;
                for (const key of Object.keys(m)) {
                    const v = m[key];
                    if (v && v.isTexture) v.dispose();
                }
                m.dispose?.();
            });
        }
    });
}
