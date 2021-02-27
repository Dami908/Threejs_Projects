

let scene,camera,renderer,orbitControl,control;
let light=new THREE.PointLight(0xeeeeee,11,50);
let light2=new THREE.AmbientLight(0xeeeeee);
let light3=new THREE.SpotLight(0xeeeeee);
let light4=new THREE.DirectionalLight(0xeeeeee);
let light5=new THREE.RectAreaLight(0xff0000, 500, -270, 40);
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
    light.position.set(10,10,5);
    light.castShadow=true;
    light.color=new THREE.Color({color:params.color});
    scene.add(light);

    //Ambient Light
    light2.position.set(-10,5,-20);
    light2.castShadow=true;
    light2.color=new THREE.Color({color:params.color});
    scene.add(light2);

    //Spot Light
    light3.position.set(-180,20,-20);
    light3.castShadow=true;
    light3.color=new THREE.Color({color:params.color});
    scene.add(light3);

    //Directional Light
    light4.position.set(-270,20,-40);
    light4.castShadow=true;
    light4.color=new THREE.Color({color:params.color});
    scene.add(light4);

    //Rectangular Light
    //light5.position.set(-270,20,-35);
    light5.castShadow=true;
    light5.color=new THREE.Color({color:params.color});
    scene.add(light5);

    //Hemisphere Light
    light6.position.set(-270,20,-40);
    light6.castShadow=true;
    light6.color=new THREE.Color({color:params.color});
    scene.add(light6);

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
    let mat = new THREE.MeshLambertMaterial({color : 0x808080 });
    let mesh = new THREE.Mesh(geo,mat);
    mesh.rotation.x = -0.5*Math.PI;

    //Sphere
    let geoSphere=new THREE.SphereGeometry(5,32,32);
    let material=new THREE.MeshStandardMaterial({color : 0xaaffaa});
    let sphere = new THREE.Mesh(geoSphere,material);
    //sphere.position.copy(light5.position);
    sphere.castShadow=true;
    sphere.position.y=6;
    sphere.position.x=13;

    //Box
    let boxSphere=new THREE.BoxGeometry(7,7,7);
    let boxmaterial=new THREE.MeshPhongMaterial({color:0x808080});
    let box = new THREE.Mesh(boxSphere,boxmaterial);
    box.castShadow=true;
    box.position.y=5.8;
    box.position.x=0;

    //Cylinder
    let cynSphere=new THREE.CylinderGeometry(5, 5, 20, 32);
    let cynmaterial= new THREE.MeshPhongMaterial({color:0x808080});
    let cyn = new THREE.Mesh(cynSphere,cynmaterial);
    cyn.castShadow=true;
    cyn.position.y=14;
    cyn.position.x=-15;


    //Adds object to scene
    scene.add(mesh);
    scene.add(sphere);
    scene.add(box);
    scene.add(cyn);

}

function setupDatGui(){
    control=new function(){
        this.name="Emmanuel";
        this.disableSpotlight = false;
        this.intensity = light.intensity;
        this.color=params.color;
    }
    let gui = new dat.GUI();
    let pointColor=gui.addFolder("Point Light");
    let Ambient=gui.addFolder("Ambient Light");
    let Spot=gui.addFolder("Spot Light");
    let Direction=gui.addFolder("Directional Light");
    let Rec=gui.addFolder("Rectangular Area Light");
    let hem=gui.addFolder("Hemisphere Light")
    pointColor.add(control,'name');
    //Point Light
    pointColor.add(control, 'intensity', 0, 34, 0.1).onChange(function (e) {
        light.intensity = control.intensity;
    });
    pointColor.addColor(params,'color').onChange(function(){
        console.log("color changed");
        light.color.set(params.color);
    });
    pointColor.add(control, 'disableSpotlight').onChange(function (e) {
        light.visible = !e;
    });

    //Ambient Light
    Ambient.add(control, 'intensity', 0, 34, 0.1).onChange(function (e) {
        light2.intensity = control.intensity;
    });
    Ambient.addColor(params,'color').onChange(function(){
        console.log("color changed");
        light2.color.set(params.color);
    });
    Ambient.add(control, 'disableSpotlight').onChange(function (e) {
        light2.visible = !e;
    });

    //Spot Light
    Spot.add(control, 'intensity', 0, 34, 0.1).onChange(function (e) {
        light3.intensity = control.intensity;
    });
    Spot.addColor(params,'color').onChange(function(){
        console.log("color changed");
        light3.color.set(params.color);
    });
    Spot.add(control, 'disableSpotlight').onChange(function (e) {
        light3.visible = !e;
    });

    //Directional Light
    Direction.add(control, 'intensity', 0, 34, 0.1).onChange(function (e) {
        light4.intensity = control.intensity;
    });
    Direction.addColor(params,'color').onChange(function(){
        console.log("color changed");
        light4.color.set(params.color);
    });
    Direction.add(control, 'disableSpotlight').onChange(function (e) {
        light4.visible = !e;
    });

    //Rectangular Area Light
    Rec.add(control, 'intensity',0, 34,0.1).onChange(function (e) {
        light5.intensity = control.intensity;
    });
    Rec.addColor(params,'color').onChange(function(){
        console.log("color changed");
        light5.color.set(params.color);
    });
    Rec.add(control, 'disableSpotlight').onChange(function (e) {
        light5.visible = !e;
    });

    //Rectangular Area Light
    hem.add(control, 'intensity',0, 34,0.1).onChange(function (e) {
        light6.intensity = control.intensity;
    });
    hem.addColor(params,'color').onChange(function(){
        console.log("color changed");
        light6.color.set(params.color);
    });
    hem.add(control, 'disableSpotlight').onChange(function (e) {
        light6.visible = !e;
    });
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
    setupDatGui();
    render();

}