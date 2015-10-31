/**
 * Created by brenden on 10/30/2015.
 */

//globals we'll be using often and stuff
var renderer, camera, scene, controls, stats, plane;

var startTime = Date.now();
var totalTime = 0;

//initialize function called from body onload()
var initialize = function(){
    //setup renderer
    renderer = new THREE.WebGLRenderer( { antialias: false, canvas : document.getElementById("mainCanvas")} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    //setup camera
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 10);
    camera.position.z = 3;

    //setup scene
    scene = new THREE.Scene();

    //setup controls
    controls = new THREE.OrbitControls( camera );
    controls.damping = 0.2;
    controls.staticMoving = false;

    //setup stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

    //TODO hook this method up for orthographic cameras
    //window.addEventListener( 'resize', onWindowResize, false );

    //fancy pants shader
    var shader = new THREE.ShaderMaterial({
        uniforms: {
            resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) },
            time : {type: "f", value: 0}
        },
        vertexShader: document.getElementById("passThroughVertex").textContent,
        fragmentShader: document.getElementById("heatFragment").textContent
    });

    //add in a debug plane
    plane = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight, 1, 1 ),shader);
    scene.add( plane );


    //start up the main animation loop
    requestAnimationFrame(animate);

};

//TODO hook this method up for orthographic cameras
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//we just keep looping through this function forever
function animate(){
    requestAnimationFrame(animate);
    render();
    stats.update();
}

//the actual render function
function render(){
    totalTime += Date.now() - startTime;
    startTime = Date.now();
    plane.material.uniforms.time.value = totalTime / 1000.0;
    renderer.render(scene,camera);
}