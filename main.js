import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

camera.position.setZ(30);

renderer.render( scene, camera )

// ! torus shape object ==============
const geometry = new THREE.TorusGeometry(100, 20, 120, 100)
const material = new THREE.MeshBasicMaterial({color: 0x44bb47, wireframe: true});
const torus = new THREE.Mesh( geometry, material )

scene.add(torus);


// ! lighting =========================
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// ? light location helper
const lightHelper = new THREE.PointLightHelper(pointLight)
// ? grid helper
const gridHelper = new THREE.GridHelper(200, 50, 0x44bb47);
scene.add(lightHelper, gridHelper)

// ! orbit controls (allows mouse perspective drag)
const controls = new OrbitControls(camera, renderer.domElement)

// ! stars ===============================
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 20, 20)
  const material = new THREE.MeshStandardMaterial({ color: 0x99DDEB })
  const star = new THREE.Mesh( geometry, material )

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// ! space texture ========================
const spaceTexture = new THREE.TextureLoader().load('assets/spaceText.png')
scene.background = spaceTexture


// ! avatar cube ==========================
const phillTexture = new THREE.TextureLoader().load('assets/meAndMo.jpeg')

const phillCube = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshBasicMaterial({ map: phillTexture })
)

scene.add(phillCube)



// ! earth sphere =========================
const earthTexture = new THREE.TextureLoader().load('assets/earthTextMap.png')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
)

scene.add(earth)



// ! position objects ======================
phillCube.position.z = -5;
phillCube.position.x = 2;

earth.position.z = 10;
earth.position.x = -10;


// ! camera movement on scroll =============
const moveCamera = () => {

  const top = document.body.getBoundingClientRect().top;

  earth.rotateX(0.05)
  earth.rotateY(0.075)
  earth.rotateZ(0.05)

  phillCube.rotateY(0.01)
  phillCube.rotateZ(0.01)

  camera.position.z = top * -0.01
  camera.position.x = top * -0.0002
  camera.position.y = top * -0.0002

}

document.body.onscroll = moveCamera;


// ! animation loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0005;

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();