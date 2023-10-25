import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Model from './model';


// Canvas
const canvas = document.querySelector('.webgl')


// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x00000)


// Lights
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)


// Model
const skull = new Model({
  name: 'skull',
  file: './assets/comskull.glb',
  scene: scene
})



// Camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 3
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  // fix cube distortion
  renderer.setSize(window.innerWidth, window.innerHeight)

})


// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second).
const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()