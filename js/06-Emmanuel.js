//Author: Emmanuel Ajayi
//Filename: 01-Emmanuel.js
//Date: January 23,2021


//declare variable

let scene,camera,renderer,orbitControl,rot,pivot,cyn;

let extrusionSettings = {
    amount: 0.7,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelSegments: 8,
    material: 0,
    extrudeMaterial: 0.1
};
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
    
    //Cylinder
    let cynSphere=new THREE.CylinderGeometry(3, 3, 20, 32);
    let cynmaterial= new THREE.MeshBasicMaterial({color:"#FFC300"});
    cyn = new THREE.Mesh(cynSphere,cynmaterial);
    cyn.position.y=10;
    cyn.position.x=-2;
    cyn.rotation.z = Math.PI / 2;
    //cyn.rotation.y=Math.PI/2;
    rot = new THREE.Box3().setFromObject( cyn );
    rot.center( cyn.position ); // this re-sets the mesh position
    cyn.position.multiplyScalar( 1 );

    let shape = new THREE.Shape();
      shape.ellipse(0,  0,            // ax, aY
        10, 10,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0  );
        let hole1=new THREE.Path();
        hole1.ellipse(0,  0,            // ax, aY
            8, 8,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0 );
        shape.holes.push(hole1);
    let geometry=new THREE.ExtrudeGeometry(shape,extrusionSettings);
    let material = new THREE.MeshBasicMaterial({color:0x00ff00});
    meshes = new THREE.Mesh(geometry,material);
    meshes.position.y=11;
    meshes.position.x=-1.8;
    meshes.position.z=6.6;

    let shape2 = new THREE.Shape();
      shape2.ellipse(0,  0,            // ax, aY
        10, 10,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0  );
        let hole2=new THREE.Path();
        hole2.ellipse(0,  0,            // ax, aY
            8, 8,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0 );
        shape2.holes.push(hole2);
    let geometry1=new THREE.ExtrudeGeometry(shape2,extrusionSettings);
    let material1 = new THREE.MeshBasicMaterial({color:0x00ff00});
    meshes2 = new THREE.Mesh(geometry1,material1);
    meshes2.position.y=19;
    meshes2.position.x=-1.8;
    meshes2.position.z=-6.6;

    let spoke=new THREE.BoxGeometry(2,19,1.5);
    let boxmaterial=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box = new THREE.Mesh(spoke,boxmaterial);
    box.position.y=8.8;
    box.position.x=-8;
    box.position.z=0.2;
    box.rotation.z=Math.PI/2;

    let spoke1=new THREE.BoxGeometry(1.5,19,2);
    let boxmaterial1=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box1 = new THREE.Mesh(spoke1,boxmaterial1);
    box1.position.y=8.8;
    box1.position.x=8;
    box1.position.z=0.2;
    box1.rotation.z=Math.PI/2;

    let spoke2=new THREE.BoxGeometry(2,19,1.5);
    let boxmaterial2=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box2 = new THREE.Mesh(spoke2,boxmaterial2);
    box2.position.y=8.8;
    box2.position.x=0.5;
    box2.position.z=-7.2;
    box2.rotation.x=Math.PI/2;

    let spoke3=new THREE.BoxGeometry(2,19,1.5);
    let boxmaterial3=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box3 = new THREE.Mesh(spoke3,boxmaterial3);
    box3.position.y=8.8;
    box3.position.x=0.5;
    box3.position.z=7.2;
    box3.rotation.x=Math.PI/2;

    let spoke4=new THREE.BoxGeometry(1.5,19,2);
    let boxmaterial4=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box4 = new THREE.Mesh(spoke4,boxmaterial4);
    box4.position.y=-8.8;
    box4.position.x=8.8;
    box4.position.z=-0;
    box4.rotation.z=Math.PI/2;

    let spoke5=new THREE.BoxGeometry(2,19,1.5);
    let boxmaterial5=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box5 = new THREE.Mesh(spoke5,boxmaterial5);
    box5.position.y=-8.8;
    box5.position.x=-8.8;
    box5.position.z=-0;
    box5.rotation.z=Math.PI/2;

    let spoke6=new THREE.BoxGeometry(2,19,1.5);
    let boxmaterial6=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box6 = new THREE.Mesh(spoke6,boxmaterial6);
    box6.position.y=-8.8;
    box6.position.x=3.8;
    box6.position.z=7;
    box6.rotation.x=Math.PI/2;

    let spoke7=new THREE.BoxGeometry(2,19,1.5);
    let boxmaterial7=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box7 = new THREE.Mesh(spoke7,boxmaterial7);
    box7.position.y=1;
    box7.position.x=-2;
    box7.position.z=7;


    

    pivot = new THREE.Group();
    
    
    cyn.add(pivot,box,box1,box2,box3,box4,box5,box6)

    scene.add( cyn);

    

}

function render(){
    requestAnimationFrame(render);
    orbitControl.update();
    renderer.render(scene,camera);
    //cyn.rotation.x += 0.01;

}

window.onload=()=>{
    init();
    setupCameraAndLight();
    createGeometry();
    render();

}