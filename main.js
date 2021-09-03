import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import phillImg from './assets/me.jpeg'
// import spaceImg from './assets/bg.png'
import earthImg from './assets/earth.jpg'
import marsImg from './assets/mars.jpg'

// ! scene ========================
const scene = new THREE.Scene();

// ! camera =======================
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// ! renderer =====================
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(0);

renderer.render( scene, camera )

// ! torus shape object ==============
const geometry = new THREE.TorusKnotGeometry(10, 4, 40, 10, 2, 3)
const material = new THREE.MeshBasicMaterial({color: 0x44bb47, wireframe: true});
const torus = new THREE.Mesh( geometry, material )

scene.add(torus);


// ! lighting =========================
// const pointLight = new THREE.PointLight(0xffffff)
// pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

// ? light location helper
// const lightHelper = new THREE.PointLightHelper(pointLight)
// ? grid helper
// const gridHelper = new THREE.GridHelper(200, 50, 0x44bb47);
// scene.add(lightHelper, gridHelper)

// ! orbit controls (allows perspective control)
const controls = new OrbitControls(camera, renderer.domElement)

// ! stars ===============================
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.05, 2, 2)
  const material = new THREE.MeshStandardMaterial({ color: 0x99DDEB })
  const star = new THREE.Mesh( geometry, material )

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(500).fill().forEach(addStar)

// ! space texture ========================
// const spaceTexture = new THREE.TextureLoader().load(spaceImg)
// scene.background = spaceTexture


// ! avatar cube ==========================
const phillTexture = new THREE.TextureLoader().load(phillImg)

const phillCube = new THREE.Mesh(
  new THREE.PlaneGeometry(3,3),
  new THREE.MeshBasicMaterial({ map: phillTexture })
)

scene.add(phillCube)



// ! earth sphere =========================
const marsTexture = new THREE.TextureLoader().load(marsImg)

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(30, 32, 32),
  new THREE.MeshBasicMaterial({ map: marsTexture })
)

scene.add(mars)

// ! earth sphere =========================
const earthTexture = new THREE.TextureLoader().load(earthImg)

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(30, 32, 32),
  new THREE.MeshBasicMaterial({ map: earthTexture })
)

scene.add(earth)


// ! position objects ======================
phillCube.position.z = -4;
phillCube.position.x = 2;

mars.position.z = 20;
mars.position.x = -45;

earth.position.z = 90;
earth.position.x = 35;

// ! camera movement on scroll =============
const moveCamera = () => {

  const top = document.body.getBoundingClientRect().top;

  // earth.rotateX(0.05)
  // earth.rotateY(0.075)
  // earth.rotateZ(0.05)

  torus.position.x -= 0.1
  torus.position.y -= 0.1


  phillCube.rotateY(0.001)
  phillCube.rotateX(0.001)
  phillCube.rotateZ(0.001)

  camera.position.z = top * -0.05
  camera.position.x = top * -0.002
  camera.position.y = top * -0.002

}

document.body.onscroll = moveCamera;


// ! animation loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;
  // torus.rotation.z += 0.0005;

  mars.position.x -= 0.001;
  earth.position.x += 0.001;

  mars.position.y -= 0.001;
  earth.position.z += 0.001;

  mars.rotation.y += 0.001;
  earth.rotation.y -= 0.001;

  phillCube.rotation.x -= 0.001;
  phillCube.rotation.y -= 0.001;
  // controls.update();

  renderer.render(scene, camera);
}

animate();