import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'


class Model {
    constructor(obj){
        this.name = obj.name
        this.file = obj.file
        this.scene = obj.scene

        this.loader = new GLTFLoader()
        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('./draco/')
        this.loader.setDRACOLoader(this.dracoLoader)

        this.init()
    }

    init() {
        this.loader.load(this.file, (response) => {

            this.mesh = response.scene.children[0]
            this.material = new THREE.MeshBasicMaterial({
                color: 'red',
                wireframe: true
            })
            this.mesh.material = this.material


            // Geometry
            this.geometry = this.mesh.geometry


            // particles material
            this.particlesMaterial = new THREE.PointsMaterial({
                color: 'white',
                size: 0.01
            })


            // particles geometry
            const sampler = new MeshSurfaceSampler(this.mesh).build()
            const numParticles = 20000
            this.particlesGeometry = new THREE.BufferGeometry()
            const particlesPosition = new Float32Array(numParticles * 3)

            for(let i = 0; i < numParticles; i++){
                const newPositon = new THREE.Vector3()
                sampler.sample(newPositon)
                particlesPosition.set([
                    newPositon.x,
                    newPositon.y,
                    newPositon.z
                ], i * 3)
            }

            this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3))


            //particles
            this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)


            this.scene.add(this.particles)
        })
    }
}

export default Model