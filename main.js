import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"

//*sence
const sence = new THREE.Scene();

//* add our Geometry

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material);
sence.add(mesh)

//* Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10)
sence.add(light)
//*sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


//* camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 30

sence.add(camera)

//* renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(sence, camera)

//* Resizeing
window.addEventListener("resize", () => {
    //*Updating size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //*Updating camra
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})
//* Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false 

controls.autoRotate= true
controls.autoRotateSpeed = 5


const loop = () => {
    controls.update()
    renderer.render(sence, camera)
    window.requestAnimationFrame(loop)
}
loop()

//*TimeLine Magic
const TL = gsap.timeline({default:{duration :1}})
TL.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
TL.fromTo('nav',{y:'-100%'},{y:'0%'})
TL.fromTo(".title",{opacity:0},{opacity:1})

//* Mouse Animation Color
let mouseDown = false
let rgb = []

window.addEventListener("mousedown", ()=> (mouseDown = true))
window.addEventListener("mouseup", ()=> (mouseDown = false))

window.addEventListener("mousemove",(e)=>{
    if(mouseDown){ 
        rgb = [
        Math.round((e.pageX / sizes.width) * 255),
        Math.round((e.pageY / sizes.width) * 255),150,
        ]

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
     gsap .to(mesh.material.color,{
        r: newColor.r,
        g:newColor.g,
        b:newColor.b,
     })

}
})