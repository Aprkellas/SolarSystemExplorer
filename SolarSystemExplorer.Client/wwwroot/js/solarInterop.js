// solarInterop.js - minimal Three + OrbitControls interop for Blazor
window.solarInterop = (() => {
    let scene, camera, renderer, controls, raycaster, mouse, cube;

    function init(canvasId) {
        if (!window.THREE) {
            console.error("THREE.js not loaded");
            return {};
        }

        const canvas = document.getElementById(canvasId);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setClearColor(0x0b1020, 1);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
        camera.position.set(2.5, 2.5, 4);


        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dir = new THREE.DirectionalLight(0xffffff, 1.2);
        dir.position.set(4, 5, 6);
        scene.add(dir);

        const geo = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.1, color: 0x88aaff });
        cube = new THREE.Mesh(geo, mat);
        cube.name = "DemoCube";
        scene.add(cube);

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        canvas.addEventListener('click', _onClick);

        window.addEventListener('resize', _resize);
        _resize();
        _loop();
    }


    function _resize() {
        if (!renderer || !camera) return;
        const c = renderer.domElement;
        const rect = c.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    function _loop() {
        if (cube) {
            cube.rotation.y += 0.01;
            cube.rotation.x += 0.005;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(_loop);
    }

    // optional: let Blazor know what was clicked
    let dotRef = null;
    function bind(dotNetRef) { dotRef = dotNetRef; }

    function _onClick(ev) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(scene.children, true);
        if (hits.length && dotRef) {
            dotRef.invokeMethodAsync("OnMeshClicked", hits[0].object.name);
        }
    }

    return { init, bind };
})();
