import * as THREE from 'three';
import './style.css'
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//Scene
const scene = new THREE.Scene();

//Create Sphere (https://threejs.org/docs/index.html?q=sph#api/en/geometries/SphereGeometry)
const geometry = new THREE.SphereGeometry(3, 64, 64) //3 is radius , 64 are width & height segments 
const material = new THREE.MeshStandardMaterial({
    color : '#00ff83',
    roughness : 0.5,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

//Light
const light = new THREE.PointLight(0xffffff, 150, 100)
light.position.set(0, 10, 10)
// light.intensity = 0.1
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height , 0.1, 100);
camera.position.z = 20;
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Resize
window.addEventListener('resize', () => {
    //update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)

})


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Animation
const loop = () => {
    controls.update()
    camera.position.z += 0.1
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()

//timeline magic
const tl = gsap.timeline({defaults : {duration : 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z: 1, x: 1, y : 1})
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.fromTo('.title', {opacity : 0}, {opacity : 1})

//Mouse Animation Colour 
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = true))

window.addEventListener('mousemove', (e) => {
    if(mouseDown){
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150,
        ]
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        })

    }
})