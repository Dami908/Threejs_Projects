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
   /* let geoSphere=new THREE.SphereGeometry(5,32,32);
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
    cyn.position.x=-15;*/
    var x = 0,y = 0;

    let extrusionSettings = {
        amount: 3,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 8,
        material: 0,
        extrudeMaterial: 1
    };
    let extrusionSettings1 = {
        amount: 1,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 8,
        material: 0,
        extrudeMaterial: 1
    };
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
    let meshes = new THREE.Mesh(geometry,material);
    meshes.position.y=10;

    let cynSphere=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
    let cynmaterial= new THREE.MeshBasicMaterial({color:"#FFC300"});
    let cyn = new THREE.Mesh(cynSphere,cynmaterial);
    cyn.position.y=15
    cyn.position.z=1

    let cynSphere1=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
    let cynmaterial1= new THREE.MeshBasicMaterial({color:"#FFC300"});
    let cyn1 = new THREE.Mesh(cynSphere1,cynmaterial1);
    cyn1.position.y=15;
    cyn1.position.x=3;
    cyn1.position.z=1;
    cyn1.rotation.z=15;

    let cynSphere2=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
    let cynmaterial2= new THREE.MeshBasicMaterial({color:"#FFC300"});
    let cyn2 = new THREE.Mesh(cynSphere2,cynmaterial2);
    cyn2.position.y=13;
    cyn2.position.x=4;
    cyn2.position.z=1;
    cyn2.rotation.z=33.5;
    
   
    
  
    let shape2=new THREE.Shape();
    shape2.ellipse(0,  0,            // ax, aY
        1, 1,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0  );
        let geometrys=new THREE.ExtrudeGeometry(shape2,extrusionSettings1);
        let materials = new THREE.MeshBasicMaterial({color:0x000000});
        let meshed = new THREE.Mesh(geometrys,materials);
        meshed.position.y=10;

    
    
        let cynSphere3=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial3= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn3 = new THREE.Mesh(cynSphere3,cynmaterial3);
        cyn3.rotation.z = Math.PI / 2;
       
        cyn3.position.y=10.5;
        cyn3.position.x=5;
        cyn3.position.z=1;

        let cynSphere4=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial4= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn4 = new THREE.Mesh(cynSphere4,cynmaterial4);
        cyn4.rotation.z = Math.PI / 2.5;
       
        cyn4.position.y=8.5;
        cyn4.position.x=5;
        cyn4.position.z=1;

        let cynSphere5=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial5= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn5 = new THREE.Mesh(cynSphere5,cynmaterial5);
        cyn5.rotation.z = Math.PI / 4;
       
        cyn5.position.y=6;
        cyn5.position.x=4;
        cyn5.position.z=1;

        let cynSphere6=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial6= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn6 = new THREE.Mesh(cynSphere6,cynmaterial6);
        
       
        cyn6.position.y=6;
        //cyn6.position.x=9;
        cyn6.position.z=1;

        let cynSphere7=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial7= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn7 = new THREE.Mesh(cynSphere7,cynmaterial7);
        
        cyn7.rotation.z = Math.PI / -5;
        cyn7.position.y=7;
        cyn7.position.x=-2;
        cyn7.position.z=1;

        let cynSphere9=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial9= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn9 = new THREE.Mesh(cynSphere9,cynmaterial9);
        
        cyn9.rotation.z = Math.PI / -3;
        cyn9.position.y=8.5;
        cyn9.position.x=-3;
        cyn9.position.z=1;

        let cynSphere10=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial10= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn10 = new THREE.Mesh(cynSphere10,cynmaterial10);
        
        cyn10.rotation.z = Math.PI / 4;
        cyn10.position.y=13.5;
        cyn10.position.x=-3;
        cyn10.position.z=1;

        let cynSphere8=new THREE.CylinderGeometry(0.5, 0.5, 9, 3);
        let cynmaterial8= new THREE.MeshBasicMaterial({color:"#FFC300"});
        let cyn8 = new THREE.Mesh(cynSphere8,cynmaterial8);
        
        cyn8.rotation.z = Math.PI / 2;
        cyn8.position.y=10.5;
        cyn8.position.x=-4;
        cyn8.position.z=1;
    //Adds object to scene
    scene.add(mesh);
    //scene.add(hole2);
    scene.add(meshes);
    scene.add(meshed);
    //scene.add(sphere);
    //scene.add(box);
    scene.add(cyn);
    scene.add(cyn1);
    scene.add(cyn2);
    scene.add(cyn3);
    scene.add(cyn4);
    scene.add(cyn5);
    scene.add(cyn6);
    scene.add(cyn7);
    scene.add(cyn8);
    scene.add(cyn9);
    scene.add(cyn10);

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