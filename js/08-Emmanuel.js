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
    let cubeLoader = new THREE.CubeTextureLoader().setPath('assets/textures/cubemap/');
    let urls=[
        'right.png',
        'left.png',
        'top.png',
        'bottom.png',
        'front.png',
        'back.png'
    ]
    let cubeTexture = cubeLoader.load(urls);
    scene.background = cubeTexture;

    


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
    light.intensity=0.5;
    scene.add(light);

    let light2=new THREE.AmbientLight(0xeeeeee);
    light2.position.set(-10,5,-20);
    light2.castShadow=true;
    light2.color=new THREE.Color({color:0xeeeeee});
    light2.intensity=0.5;
    scene.add(light2);

    let light4=new THREE.DirectionalLight(0xeeeeee);
    light4.position.set(-270,20,-40);
    light4.castShadow=true;
    light4.color=new THREE.Color({color:0xeeeeee});
    light4.intensity=0.5;
    //scene.add(light4);

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
    let alpha=new THREE.TextureLoader().load('assets/textures/alpha/transparency.png');
    let geoSphere=new THREE.SphereGeometry(5,32,32);
    let material=new THREE.MeshStandardMaterial({alphaMap:alpha,alphaTest:0.5});
    let sphere = new THREE.Mesh(geoSphere,material);
    sphere.position.y=5;
    sphere.position.x=13;

    //Box

    let cubeLoader = new THREE.CubeTextureLoader().setPath('assets/textures/cubemap/');
    let urls=[
        'right.png',
        'left.png',
        'top.png',
        'bottom.png',
        'front.png',
        'back.png'
    ]
    let cubeTexture = cubeLoader.load(urls);

    let boxSphere=new THREE.BoxGeometry(7,7,7);
    let boxmaterial=new THREE.MeshStandardMaterial({envMap:cubeTexture,metalness:1,roughness:0});
    boxmaterial.mapping=THREE.CubeRefractionMapping;
    let box = new THREE.Mesh(boxSphere,boxmaterial);
    box.position.y=3.8;
    box.position.x=0;



    //Cylinder
    let normal=new THREE.TextureLoader().load('assets/textures/NormalMap.jpg');
    let shiny=new THREE.TextureLoader().load('assets/textures/shinyMap.jpg');
    let geoSphere1=new THREE.SphereGeometry(5,32,32);
    let material1=new THREE.MeshStandardMaterial({normalMap:normal,envMap:shiny,roughness:0,metalness:1});
    let sphere1 = new THREE.Mesh(geoSphere1,material1);
    sphere1.position.y=5;
    sphere1.position.x=-15;

    


    //Adds object to scene
    scene.add(mesh);
    scene.add(sphere);
    scene.add(box);
    scene.add(sphere1);

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