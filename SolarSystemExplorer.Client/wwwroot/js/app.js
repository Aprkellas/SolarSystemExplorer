// app.js
import { init as initScene } from './core/sceneHost.js';
import { loadPresetPlanets } from './planets/planetLoader.js';
import { presetPlanets } from './planets/planetDefs.js';

export function boot(canvasId) {
    initScene(canvasId);
    loadPresetPlanets(presetPlanets);
}
