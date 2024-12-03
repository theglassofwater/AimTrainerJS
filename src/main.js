import * as THREE from 'three';

// Make classes so cubes can be easily killed and repositioned?

// setting up environment 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth / window.innerHeight),
    1,
    1000,
);
camera.position.z = 10;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth,
    window.innerHeight,
);

document.body.appendChild( renderer.domElement );

// setting up cubes

function generateRandNum(min, max) {
    let randomNum = (Math.random() * (max - min) + min).toFixed(3);
    return randomNum;
}

const numOfCubes = 3;
const cubes = [];
for (let i = 0; i < numOfCubes; i++){
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000});
    const cube = new THREE.Mesh( cubeGeometry, cubeMaterial);
    cube.position.x = generateRandNum(-3,3);
    cube.position.y = generateRandNum(-3,3)
    cube.name= "cube" + i;
    cubes.push(cube);
    scene.add(cubes[i]);
};


//setting up mouse, and event listeners and raycaster?
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const intersects = raycaster.intersectObjects(scene.children, true);

    
}

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++){
        intersects[i].object.position.x = generateRandNum(-3,3);
        intersects[i].object.position.y = generateRandNum(-3,3);
        counter++;
        console.log(counter);
        
    };

    console.log('clicked at:', mouse.x, mouse.y);
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onClick);

let counter = 0;

// game loop
function animate() {
    requestAnimationFrame(animate);

    // let isClicked = false

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < cubes.length; i++){
        cubes[i].rotation.x += 0.01;
        cubes[i].rotation.y += 0.01;
        cubes[i].material.color.set(0xff0000)
    };


    for (let i = 0; i < intersects.length; i++){
        intersects[i].object.material.color.set(0x0000ff); // Highlight color
        };


    renderer.render(scene, camera);   
};

animate()