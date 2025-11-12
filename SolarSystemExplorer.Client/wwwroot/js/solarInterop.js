// solarInterop.js
import { boot } from './app.js';

let dotRef = null;

export function init(canvasId) {
    boot(canvasId);
}

export function bind(ref) {
    dotRef = ref;
}

//export function addPlanet(planetDef) {
//    // Dynamically import the planetLoader module to access addPlanet function
//    import('./planets/planetLoader.js').then(module => {
//        module.addPlanet(planetDef);
//    });
//})

//export function notifyPlanetClicked(planetName) {
//    if (dotRef) {
//        dotRef.invokeMethodAsync('OnPlanetClicked', planetName);
//    }
//}

//export function remotePlanetClick(planetName) {
//    if (dotRef) {
//        dotRef.invokeMethodAsync('OnRemotePlanetClick', planetName);
//    }
//}