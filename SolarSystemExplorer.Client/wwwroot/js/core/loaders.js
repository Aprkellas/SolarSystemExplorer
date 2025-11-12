// core/loaders.js
import * as THREE from '/lib/three/three.module.min.js';
import { GLTFLoader } from '/lib/three/GLTFLoader.js';

export const textureLoader = new THREE.TextureLoader();
export const gltfLoader = new GLTFLoader();