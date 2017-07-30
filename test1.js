// This source is the javascript needed to build a sky box in **three.js**
// It is the source about this [blog post](/blog/2011/08/15/lets-do-a-sky/).
// BORROWING CODE FROM http://learningthreejs.com/data/lets_do_a_sky/lets_do_a_sky.html
// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
rollLeft = 0;
rollRight = 0;
pitchUp = 0;
pitchDown = 0;
yawLeft = 0;
yawRight = 0;
// ## bootstrap functions
// initialiaze everything
init();
// make it movee		
animate();

// ## Initialize everything
function init() {
	// test if webgl is supported

	// create the camera
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 100000 );

	// create the Scene
	var textureCube = new THREE.CubeTextureLoader()
					.setPath( 'images/Bridge2/')
					.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );

				scene = new THREE.Scene();
				scene.background = textureCube;
var ambient = new THREE.AmbientLight( 0x050505 );
				scene.add( ambient );

				directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
				directionalLight.position.set( 2, 1.2, 10 ).normalize();
				scene.add( directionalLight );

				directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
				directionalLight.position.set( - 2, 1.2, -10 ).normalize();
				scene.add( directionalLight );

				pointLight = new THREE.PointLight( 0xffaa00, 2 );
				pointLight.position.set( 2000, 1200, 10000 );
				scene.add( pointLight );
	// ## End of the Skybox Code

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	// init the Stats and append it to the Dom - performance vuemeter
}

// ## Animate and Display the Scene
function animate() {
	// render the 3D scene
	render();
	// relaunch the 'timer' 
	requestAnimationFrame( animate );
	// update the stats
	stats.update();
}

var keyDown = function(event){
    if (event.altKey){
        return;
    }
    switch(event.keyCode){
        case 65: rollLeft = 1; break;
        case 68: rollRight = 1; break;
        case 38: pitchUp = 1; break;
        case 40: pitchDown = 1; break;
        case 37: yawLeft = 1; break;
        case 39: yawRight = 1; break;
    }
}
var keyUp = function(event){
    if (event.altKey){
        return;
    }
    switch(event.keyCode){
        case 65: rollLeft = 0; break;
        case 68: rollRight = 0; break;
        case 38: pitchUp = 0; break;
        case 40: pitchDown = 0; break;
        case 37: yawLeft = 0; break;
        case 39: yawRight = 0; break;
        //Todo: Strafing
    }
}
// ## Render the 3D Scene
function render() {
	// move the camera based on a timer
	var timer = - new Date().getTime() * 0.0002; 
	
 	camera.rotateX(yawRight-yawLeft);
 	camera.rotateY(pitchUp-pitchDown);
 	camera.rotateZ(rollRight-rollLeft);

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
