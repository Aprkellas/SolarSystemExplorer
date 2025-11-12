// core/sceneHost.js
import * as THREE from '/lib/three/three.module.min.js';
import { OrbitControls } from '/lib/threes/OrbitControls.js';
import { onFrame, clearFrameCallbacks } from './updateLoop.js';

let scene, camera, renderer, controls;
export function init(canvasId) {
    const canvas = document.getElementById(canvasId);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(devicePixelRatio || 1);
    renderer.setClearColor(0x0b1020, 1);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2e7);
    camera.position.set(2.5, 2.5, 4);

    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    window.addEventListener('resize', _resize);
    _resize();

    const loop = () => {
        controls.update();
        onFrame.invoke();         // let other modules animate
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    };
    loop();
}

export const getScene = () => scene;
export const getCamera = () => camera;
export const getRenderer = () => renderer;

function _resize() {
    const r = renderer.domElement.getBoundingClientRect();
    const w = Math.max(1, r.width | 0), h = Math.max(1, r.height | 0);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

export function dispose() {
    window.removeEventListener('resize', _resize);
    clearFrameCallbacks();
    // you can add a scene traversal + dispose here if you want full teardown
}
