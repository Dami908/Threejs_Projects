//Author: Emmanuel Ajayi
//Filename: 01-Emmanuel.js
//Date: January 23,2021


//declare variable

let scene,camera,renderer,orbitControl;
//declare init
//Initialize the threejs environment
function init(){
    scene= new THREE.Scene();
    renderer= new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0x434674);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);


}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(
        75, //Degree of camera
        window.innerWidth/window.innerHeight, //shape
        0.1, //near clipping plane
        100 //Far clipping plane
    );
    camera.position.set(-10,15,10); //Sets the camera's Position
    camera.lookAt(scene.position);
    scene.add(camera);

    orbitControl = new THREE.OrbitControls(camera,renderer.domElement);
    let light=new THREE.PointLight(0xeeeeee,20,50);
    light.position.set(-5,5,-5)
    scene.add(light);

    let axesHelper=new THREE.AxesHelper(5)
    axesHelper.position.y=8;
    scene.add(axesHelper);

}

function createGeometry(){
    //Plane
    let geo=new THREE.PlaneBufferGeometry(
        60, //Width
        20 //Height or Length
    );
    let mat = new THREE.MeshLambertMaterial({color : "#903749" });
    let mesh = new THREE.Mesh(geo,mat);
    mesh.rotation.x = -0.5*Math.PI;

    //Sphere
    let geoSphere=new THREE.SphereGeometry(5,32,32);
    let material=new THREE.MeshBasicMaterial({color : "#e84545"});
    let sphere = new THREE.Mesh(geoSphere,material);
    sphere.position.y=5;
    sphere.position.x=13;

    //Box
    let boxSphere=new THREE.BoxGeometry(7,7,7);
    let boxmaterial=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box = new THREE.Mesh(boxSphere,boxmaterial);
    box.position.y=3.8;
    box.position.x=0;

    //Cylinder
    let cynSphere=new THREE.CylinderGeometry(5, 5, 20, 32);
    let cynmaterial= new THREE.MeshBasicMaterial({color:"#FFC300"});
    let cyn = new THREE.Mesh(cynSphere,cynmaterial);
    cyn.position.y=10;
    cyn.position.x=-15;


    //Adds object to scene
    scene.add(mesh);
    scene.add(sphere);
    scene.add(box);
    scene.add(cyn);

}

function render(){
    requestAnimationFrame(render);
    orbitControl.update();
    renderer.render(scene,camera);

}

window.onload=()=>{
    init();
    setupCameraAndLight();
    createGeometry();
    render();

}