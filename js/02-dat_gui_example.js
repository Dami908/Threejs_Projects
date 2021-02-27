//Author: Emmanuel Ajayi
//Filename: 01-dat_gui_example.js
//Date: January 27,2021

let scene,camera,renderer;
let box,sphere,orbitControl,control,boxmaterial,firstMaterial;
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
    light.position.set(-115,15,115)
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x333333));

    let axesHelper=new THREE.AxesHelper(5)
    axesHelper.position.y=8;
    scene.add(axesHelper);

}
function createGeometry(){
    let geo=new THREE.PlaneBufferGeometry(
        60, //Width
        20 //Height or Length
    );
    let mat = new THREE.MeshLambertMaterial({color : "#903749" });
    let mesh = new THREE.Mesh(geo,mat);
    mesh.rotation.x = -0.5*Math.PI;
    scene.add(mesh);

    //Box
    let boxSphere=new THREE.BoxGeometry(7,7,7);
    firstMaterial=new THREE.MeshBasicMaterial({color:"#893093"});
    boxmaterial=new THREE.MeshBasicMaterial({color:params.color});
    box = new THREE.Mesh(boxSphere,firstMaterial);
    box.position.y=3.8;
    box.position.x=0;
    scene.add(box);


}
function setupDatGui(){
    
    control = new function(){
        this.name="Emmanuel";
        this.height=0;
        this.size=0;
        this.speed=0.01;
        this.threatLevel=[]
        
        //this.color='#53354a';
       
        this.addCube=function(){
            let boxSphere=new THREE.BoxGeometry(7,7,7);
            boxmaterial=new THREE.MeshBasicMaterial({color:params.color});
            box = new THREE.Mesh(boxSphere,boxmaterial);
            box.position.y=3.8;
            box.position.x=0;
            scene.add(box);
            

        }
    }
    
    let gui = new dat.GUI();
    gui.add(control,'addCube');
    gui.add(control,'name');
    gui.add(control,'height').min(-8).max(10).step(0.25).name("Height of Cube");
    gui.add(control,'size').min(0).max(6).step(0.001);
    gui.add(control,'speed').min(0).max(0.2).step(0.01);
    gui.addColor(params,'color').onChange(function(){
        firstMaterial=new THREE.MeshBasicMaterial({color:"#893093"});
        console.log("color changed");
        boxmaterial.color.set(params.color);
    });
    gui.add(control,'threatLevel',['red','Orange','Yellow']).onChange(function(){
        console.log(control.threatLevel)
        if(control.threatLevel=='red'){
            console.log("This is red");
        }
    });
    
}
function render(){
    requestAnimationFrame(render);
    orbitControl.update();
    box.position.y=control.height;
    box.rotation.y+=control.speed;
    box.rotation.x+=control.speed;
    box.scale.x=control.size;
    box.scale.y=control.size;
   
    renderer.render(scene,camera);

}
window.onload=()=>{
    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();

}