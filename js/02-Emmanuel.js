//Author: Emmanuel Ajayi
//Filename: 02-Emmanuel.js
//Date: January 31,2021

let scene,camera,renderer;
let box,sphere,orbitControl,control,firstMaterial;
let boxmaterial;

let params = {
    color: "#ff0000"
  };

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
    boxmaterial=new THREE.MeshBasicMaterial({color:"#53354a"});
    let box = new THREE.Mesh(boxSphere,boxmaterial);
    box.position.y=3.8;
    box.position.x=0;

    


    //Adds object to scene
    scene.add(mesh);
    scene.add(sphere);
    scene.add(box);
   

}
function setupDatGui(){
    control = new function(){
        this.name="Emmanuel";
        this.size=2;
        this.shapes=[];

        //this function creates the object and adds it to the scene
        this.createObject=function(){

            if(control.shapes=="cube"){
            let boxSphere=new THREE.BoxGeometry(7,7,7);
            boxmaterial=new THREE.MeshBasicMaterial({color:params.color});
            box = new THREE.Mesh(boxSphere,boxmaterial);
            box.position.x=Math.random() * 30;
            box.position.y=Math.random()*15;
            box.position.z=Math.random()*10;
            box.scale.x=control.size;
            box.scale.y=control.size;
            scene.add(box);
            }

            else if(control.shapes=="Sphere"){
            let geoSphere=new THREE.SphereGeometry(5,32,32);
            let material=new THREE.MeshBasicMaterial({color : params.color});
            let sphere = new THREE.Mesh(geoSphere,material);
            sphere.position.y=Math.random()*30;
            sphere.position.x=Math.random()*15;
            sphere.position.z=Math.random()*10;
            scene.add(sphere);
            }
        }

        // this function outputs to the console
        this.showVariable=function(){
         console.log(`Size:${this.size}`);
         console.log(`Shapes:${control.shapes}`);
         console.log(`Color:${params.color}`);

        }


    }
    let gui = new dat.GUI();
    gui.add(control,'name');
    let show=gui.addFolder('Set the Properties of the object');

    show.add(control,'size').min(2).max(6).step(1);
    show.addColor(params,'color').onChange();
    show.add(control,'shapes',['Sphere','cube']);
    gui.add(control,'createObject');
    gui.add(control,'showVariable');
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