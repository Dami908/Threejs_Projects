//Author: Emmanuel Ajayi
//Filename: 01-Emmanuel.js
//Date: January 23,2021


//declare variable
let scene,camera,renderer,meshd,mesh,geo,mat;
let pointLight,spotLight;
let size = 100,number = 20;
const cell = size/number;
const half_cell = cell * 0.5;
const tex = new THREE.TextureLoader().load('assets/textures/maroon-square.png');
const raycaster = new THREE.Raycaster();
let tops = [];
//declare init
//Initialize the threejs environment
function init(){
    scene= new THREE.Scene();
    renderer= new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0x434674);
    renderer.shadowMap.enabled=true;
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);


}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(
        75, //Degree of camera
        window.innerWidth/window.innerHeight, //shape
        0.1, //near clipping plane
        500 //Far clipping plane
    );
    camera.position.set(-100,15,40); //Sets the camera's Position
    camera.lookAt(scene.position);
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0x222222));

    let sphere = new THREE.SphereBufferGeometry(0.5,16,8);
    pointLight = new THREE.PointLight(0x77ffff,2,50);
    pointLight.position.set(-5,5,-5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    spotLight = new THREE.SpotLight(0xffaaff);
    spotLight.position.set(5,10,-5);
    spotLight.castShadow=true;
    scene.add(spotLight);

    let directionalLight = new THREE.DirectionalLight(0xffaa77,0.5);
    directionalLight.position.set(0,10,3);
    directionalLight.castShadow=true;
    scene.add(directionalLight);

}

function createGeometry(){
    scene.add(new THREE.AxesHelper(20));

    let geo = new THREE.PlaneBufferGeometry(100,100 );
    let mat = new THREE.MeshLambertMaterial({color:0xffffff});
    let plane = new THREE.Mesh(geo,mat);

    plane.rotation.x=-0.5 * Math.PI;
    plane.receiveShadow = true;
    plane.position.y =- 0.05;
    scene.add(plane);

    addGrid();

}
function addGrid(){
    geo = new THREE.PlaneBufferGeometry(cell,cell );
    mat = new THREE.MeshLambertMaterial({color:0xffffff,map:tex});
    mesh = new THREE.Mesh(geo,mat);
    mesh.rotation.x=Math.PI * -0.5;
    for(let z = -number/2; z<number/2; z++){
        for(let x = -number/2; x<number/2; x++){
            let clone = mesh.clone();
            clone.position.set(x * cell,0,z*cell);
            tops.push(clone);
            scene.add(clone);
        }
    }
}
function OnMouseDown(event){
    let mousePos = new THREE.Vector2(
        (event.clientX / window.innerWidth)*2-1,
        -(event.clientY / window.innerHeight)*2+1
    );
    console.log(mousePos);
    raycaster.setFromCamera(mousePos,camera);
    let intersects = raycaster.intersectObjects(tops);
    console.log(intersects.length);
    if(intersects.length > 0){
        let obj = intersects[0].object;
        let x = obj.position.x;
        let z = obj.position.z;
        let y = half_cell;
       
        meshd = new THREE.Mesh(
            new THREE.BoxBufferGeometry(cell,cell,cell),
            new THREE.MeshBasicMaterial({color: 0xffaa77,map:tex})
        ); 
        meshd.position.set(x,y,z);
        scene.add(meshd);
        mesh.position.set(x,5.3,z);
        tops.push(mesh);
        scene.add(mesh);
        if(intersects.length > 1){
            meshd = new THREE.Mesh(
                new THREE.BoxBufferGeometry(cell,cell,cell),
                new THREE.MeshBasicMaterial({color: 0xffaa77,map:tex})
            ); 
            meshd.position.set(x,7,z);
            scene.add(meshd);
            
        }
        
        
        

        
    }
    
   

}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);

}

window.onload=()=>{
    init();
    setupCameraAndLight();
    createGeometry();
    window.addEventListener('mousedown',OnMouseDown,false);
    render();

}