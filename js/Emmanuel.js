

let scene,camera,renderer,orbitControl,control,torus,torus1,torus2,rot,rotate;
let light=new THREE.PointLight(0xeeeeee,11,50);
let light2=new THREE.AmbientLight(0xeeeeee);
let light4=new THREE.DirectionalLight(0xeeeeee);
let light6=new THREE.HemisphereLight(0xff0000);
let params = {
    color: "#ff0000"
  };
//declare init
//Initialize the threejs environment
function init(){
    scene= new THREE.Scene();
    renderer= new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0x434674);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled=true;
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
    
    //Point Light
    light.position.set(23,0,0);
    light.castShadow=true;
    light.color=new THREE.Color({color:params.color});
    //scene.add(light);

    //Ambient Light
    light2.position.set(-10,5,-20);
    light2.castShadow=true;
    light2.color=new THREE.Color({color:params.color});
    light2.intensity=0.1;
    scene.add(light2);

    //Directional Light
    light4.position.set(-270,20,-40);
    light4.castShadow=true;
    light4.color=new THREE.Color({color:params.color});
    scene.add(light4);

    //Hemisphere Light
    light6.position.set(-270,20,-40);
    light6.castShadow=true;
    light6.color=new THREE.Color({color:params.color});
    light6.intensity=0.1;
    scene.add(light6);

    let axesHelper=new THREE.AxesHelper(5)
    axesHelper.position.y=8;
    scene.add(axesHelper);

    let GridHelper= new THREE.GridHelper(100,5)
    scene.add(GridHelper);

    let geoSphere1=new THREE.SphereGeometry(2,32,32);
    let material1=new THREE.MeshPhysicalMaterial({color : 0xaaffaa});
    let sphere1 = new THREE.Mesh(geoSphere1,material1);
    sphere1.position.x=23;

    rotate=new THREE.Object3D();
    rotate.position.y=3.8;
    rotate.position.x=0;
    rotate.add(light,sphere1);
    scene.add(rotate);

}
function createGeometry(){
    //Sphere
    let geoSphere=new THREE.SphereGeometry(2,32,32);
    let material=new THREE.MeshPhysicalMaterial({color : 0xaaffaa});
    let sphere = new THREE.Mesh(geoSphere,material);
    //sphere.position.copy(light5.position);
    sphere.castShadow=true;
    material.roughness=0;
    material.metalness=1;
    sphere.position.y=19;
    sphere.position.x=-15;
    sphere.scale.x=0.5;
    sphere.scale.y=0.4;
    sphere.scale.z=0.5;

    const geometry = new THREE.TorusGeometry( 9, 0.6, 16, 100 );
    material = new THREE.MeshStandardMaterial( { color: "#ff0000" } );
    torus = new THREE.Mesh( geometry, material );
    torus.castShadow=true;
    torus.rotation.y=Math.PI/2;
    torus.rotation.x=Math.PI/2;
    scene.add( torus );

    const geometry1 = new THREE.TorusGeometry( 12, 0.6, 16, 100 );
    material = new THREE.MeshStandardMaterial( { color: "#00cc00" } );
    torus1 = new THREE.Mesh( geometry1, material );
    torus1.castShadow=true;
    scene.add( torus1 );

    const geometry2 = new THREE.TorusGeometry( 15, 0.6, 16, 100 );
    material2 = new THREE.MeshStandardMaterial( { color: "#0000ff" } );
    torus2 = new THREE.Mesh( geometry2, material2 );
    torus2.castShadow=true;
    torus2.rotation.x=Math.PI/2;
    scene.add( torus2 );

    //Cylinder
    let cynSphere=new THREE.CylinderGeometry(2, 2, 10, 32);
    let cynmaterial= new THREE.MeshPhysicalMaterial({color:0x808080});
    let cyn = new THREE.Mesh(cynSphere,cynmaterial);
    cyn.castShadow=true;
    cynmaterial.roughness=0;
    cyn.position.y=16.5;
    cyn.position.x=-15;
    cyn.scale.x=0.5;
    cyn.scale.y=0.5;
    cyn.scale.z=0.5;

   let bullet=new THREE.Object3D();
   bullet.add(cyn,sphere);
   bullet.rotation.x+=Math.PI/2;
   bullet.position.x=15;
   bullet.position.z=-17;
   bullet.castShadow=true;
   scene.add(bullet);

}
function setupDatGui(){
    control=new function(){
        this.red_Speed=0;
        this.green_Speed=0;
        this.blue_Speed=0;
    }
    let gui = new dat.GUI();
    gui.add(control,'red_Speed').min(0).max(0.05).step(0.01).name("red_Speed");
    gui.add(control,'green_Speed').min(0).max(0.05).step(0.01).name("green_Speed");
    gui.add(control,'blue_Speed').min(0).max(0.05).step(0.01).name("blue_Speed");
}
function render(){
    requestAnimationFrame(render);
    orbitControl.update();
    renderer.render(scene,camera);
    torus.rotation.y -= control.red_Speed;
    torus1.rotation.y -= control.green_Speed;
    torus2.rotation.x+=control.blue_Speed;
    rotate.rotation.y+=0.02;
}
window.onload=()=>{
    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();

}