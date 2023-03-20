import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const sunTexture = new THREE.TextureLoader().load('textures/8k_sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun);

const earthTexture = new THREE.TextureLoader().load('textures/8k_earth_daymap.jpg');
//const earthNormalmap = new THREE.TextureLoader().load('textures/8k_earth_normal_map.tif');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(20, 0, 0);
sun.add(earth);

const background = new THREE.TextureLoader().load('textures/8k_stars.jpg');
scene.background = background;

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xFFFFFF); 
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function createStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(createStar);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate()
