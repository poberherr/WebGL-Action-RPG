$(document).ready(function(){

		var keyboard = new THREEx.KeyboardState();

		var bigrobot_mesh = null;

		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		var FLOOR = -250;

		var container,stats;

		var camera, scene;
		var canvasRenderer, webglRenderer;

		var mesh, zmesh, geometry;

		var mouseX = 0, mouseY = 0;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		var render_canvas = 0, render_gl = 1;
		var has_gl = 0;

		//var bcanvas = document.getElementById( "rcanvas" );
		//var bwebgl = document.getElementById( "rwebgl" );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		init();
		animate();

		render_canvas = !has_gl;
		//bwebgl.style.display = has_gl ? "inline" : "none";
		//bcanvas.className = render_canvas ? "button" : "button inactive";

		function init() {

			container = document.createElement( 'div' );
			document.body.appendChild( container );

			camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
			camera.position.z = 500;

			scene = new THREE.Scene();

			// GROUND

			/*
			var x = document.createElement( "canvas" );
			var xc = x.getContext("2d");
			x.width = x.height = 128;
			xc.fillStyle = "#fff";
			xc.fillRect(0, 0, 128, 128);
			xc.fillStyle = "#000";
			xc.fillRect(0, 0, 64, 64);
			xc.fillStyle = "#999";
			xc.fillRect(32, 32, 32, 32);
			xc.fillStyle = "#000";
			xc.fillRect(64, 64, 64, 64);
			xc.fillStyle = "#555";
			xc.fillRect(96, 96, 32, 32);

			var xm = new THREE.MeshBasicMaterial( { map: new THREE.Texture( x, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping ) } );
			xm.map.needsUpdate = true;
			xm.map.repeat.set( 10, 10 );

			geometry = new THREE.PlaneGeometry( 100, 100, 15, 10 );

			mesh = new THREE.Mesh( geometry, xm );
			mesh.position.set( 0, FLOOR, 0 );
			mesh.rotation.x = - Math.PI / 2;
			mesh.scale.set( 10, 10, 10 );
			scene.add( mesh );
			*/
			// SPHERES

			var material_spheres = new THREE.MeshLambertMaterial( { color: 0xdddddd } ),
			    sphere = new THREE.SphereGeometry( 100, 16, 8 );

/*
			for ( var i = 0; i < 10; i ++ ) {

				mesh = new THREE.Mesh( sphere, material_spheres );

				mesh.position.x = 500 * ( Math.random() - 0.5 );
				mesh.position.y = 300 * ( Math.random() - 0 ) + FLOOR;
				mesh.position.z = 100 * ( Math.random() - 1 );

				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.25 * ( Math.random() + 0.5 );

				scene.add( mesh );

			}
*/

			// LIGHTS

			var ambient = new THREE.AmbientLight( 0x221100 );
			scene.add( ambient );

			var directionalLight = new THREE.DirectionalLight( 0xffeedd );
			directionalLight.position.set( 0, -70, 100 ).normalize();
			scene.add( directionalLight );

			// RENDERER

			if ( render_gl ) {

				try {

					webglRenderer = new THREE.WebGLRenderer();
					webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
					webglRenderer.domElement.style.position = "relative";

					container.appendChild( webglRenderer.domElement );

					has_gl = 1;

				}
				catch (e) {
				}

			}

			/*
			if ( render_canvas ) {

				canvasRenderer = new THREE.CanvasRenderer();
				canvasRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( canvasRenderer.domElement );

			}
			*/

			// STATS
			/*
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = window.innerHeight-100; 
			stats.domElement.style.zIndex = 100;
			container.appendChild( stats.domElement );
			*/
			//

			//bcanvas.addEventListener("click", toggleCanvas, false);
			//bwebgl.addEventListener("click", toggleWebGL, false);

			//var loader = new THREE.BinaryLoader(),
			var loader = new THREE.JSONLoader();

			loader.load( "model/blade/blade.js", function( geometry ) {

				material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( "model/blade/blade.jpg" ), ambient: 0x999999, color: 0xffffff, specular: 0xffffff, shininess: 25, morphTargets: true } );
				zmesh = new THREE.MorphAnimMesh( geometry, material );
				zmesh.rotation.y = -Math.PI/2;
				zmesh.scale.set(4,4,4);
				zmesh.duration = 1000*20;
				zmesh.castShadow = true;
				zmesh.receiveShadow = false;
				zmesh.position.set( -80, FLOOR, 50 );
				bigrobot_mesh = zmesh;
				scene.add( zmesh );

				//createMaterialsPalette( geometry.materials, 100, 0 );
			} );

			//callbackMale   = function( geometry ) { createScene( geometry,  90, FLOOR, 50, 105 ) },
			//callbackFemale = function( geometry ) { createScene( geometry, -80, FLOOR, 50, 0 ) };

			//loader.load( "model/blade/blade.js", callbackMale );
			//loader.load( "obj/male02/Male02_dds.js", callbackMale );
			//loader.load( "obj/female02/Female02_slim.js", callbackFemale );

			//loader.load( "obj/male02/Male02_bin.js", callbackMale );
			//loader.load( "obj/female02/Female02_bin.js", callbackFemale );

			window.addEventListener( 'resize', onWindowResize, false );

		}

		function onWindowResize() {

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );
			//if ( canvasRenderer ) canvasRenderer.setSize( window.innerWidth, window.innerHeight );

		}

		/*
		function createScene( geometry, x, y, z, b ) {

			zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
			zmesh.position.set( x, y, z );
			zmesh.scale.set( 3, 3, 3 );
			scene.add( zmesh );

			createMaterialsPalette( geometry.materials, 100, b );

		}

		function createMaterialsPalette( materials, size, bottom ) {

			for ( var i = 0; i < materials.length; i ++ ) {

				// material

				mesh = new THREE.Mesh( new THREE.PlaneGeometry( size, size ), materials[i] );
				mesh.position.x = i * (size + 5) - ( ( materials.length - 1 )* ( size + 5 )/2);
				mesh.position.y = FLOOR + size/2 + bottom;
				mesh.position.z = -100;
				scene.add( mesh );

				// number

				var x = document.createElement( "canvas" );
				var xc = x.getContext( "2d" );
				x.width = x.height = 128;
				xc.shadowColor = "#000";
				xc.shadowBlur = 7;
				xc.fillStyle = "orange";
				xc.font = "50pt arial bold";
				xc.fillText( i, 10, 64 );

				var xm = new THREE.MeshBasicMaterial( { map: new THREE.Texture( x ), transparent: true } );
				xm.map.needsUpdate = true;

				mesh = new THREE.Mesh( new THREE.PlaneGeometry( size, size ), xm );
				mesh.position.x = i * ( size + 5 ) - ( ( materials.length - 1 )* ( size + 5 )/2);
				mesh.position.y = FLOOR + size/2 + bottom;
				mesh.position.z = -99;
				scene.add( mesh );

			}

		}
		*/

		function onDocumentMouseMove(event) {

			mouseX = ( event.clientX - windowHalfX );
			mouseY = ( event.clientY - windowHalfY );

		}

		//

		function animate() {

			requestAnimationFrame( animate );

			render();
			//stats.update();

		}

		function render() {

			//camera.position.x += ( mouseX - camera.position.x ) * .05;
			//camera.position.y += ( - mouseY - camera.position.y ) * .05;

			if(bigrobot_mesh != null ) {
				bigrobot_mesh.rotation.y += 0.01;
				camera.lookAt( bigrobot_mesh.position );
			}

			

			if ( render_gl && has_gl ) {
				webglRenderer.render( scene, camera );
			}
			//if ( render_canvas ) canvasRenderer.render( scene, camera );

		}

/*
		function toggleCanvas() {

			render_canvas = !render_canvas;
			//bcanvas.className = render_canvas ? "button" : "button inactive";

			render_gl = !render_canvas;
			//bwebgl.className = render_gl ? "button" : "button inactive";

			if( has_gl )
				webglRenderer.domElement.style.display = render_gl ? "block" : "none";

			canvasRenderer.domElement.style.display = render_canvas ? "block" : "none";

		}

		function toggleWebGL() {

			render_gl = !render_gl;
			//bwebgl.className = render_gl ? "button" : "button inactive";

			render_canvas = !render_gl;
			//bcanvas.className = render_canvas ? "button" : "button inactive";

			if( has_gl )
				webglRenderer.domElement.style.display = render_gl ? "block" : "none";

			canvasRenderer.domElement.style.display = render_canvas ? "block" : "none";

		}
*/

	/**
 	 * Create a checkerboard tQuery.Mesh
	 */
	/*tQuery.registerStatic('createCheckerboard', function(opts){
		// handle parameters
		opts	= tQuery.extend(opts, {
			width		: 1,		
			height		: 1,
			segmentsW	: 8,
			segmentsH	: 8,
			materialEven	: new THREE.MeshBasicMaterial({ color: 0xcccccc }),
			materialOdd	: new THREE.MeshBasicMaterial({ color: 0x444444 })
		});
		// create the geometry	
		var geometry		= new THREE.PlaneGeometry( opts.width, opts.height, opts.segmentsW, opts.segmentsH );
		// set materials per faces
		geometry.materials	= [opts.materialEven, opts.materialOdd];
		geometry.faces.forEach(function(face, idx){
			var y	= Math.floor(idx / opts.segmentsW);
			var x	= idx - (y*opts.segmentsW);
			face.materialIndex	= (y % 2 + x%2 ) %2;
		});

		// create the mesh
		var material= new THREE.MeshFaceMaterial();
		var mesh	= new THREE.Mesh(geometry, material);
		mesh.rotation.x	= -Math.PI/2;
		return tQuery(mesh);
	});
	*/

	/* erzeuge Keyboard Object to query Keystates */
	
	/*
	var instance	= null;
	tQuery.registerStatic('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});
	*/			

	
	/* Create World with tquery */
	/*world	= tQuery.createWorld().boilerplate().start();*/


	// remove camera controls to be easily clickable
	/*world.removeCameraControls();*/

	/*
	world.camera().position.x = 0;
 	world.camera().position.y = 2;	
 	world.camera().position.z = 10;	
	*/	


/**
 * Returns a random number between min and max
  */
	/*
  function getRandomArbitary (min, max) {
	      return Math.random() * (max - min) + min;
  }
	*/

  /**
   * Returns a random integer between min and max
    * Using Math.round() will give you a non-uniform distribution!
	 */
	/*
	 function getRandomInt (min, max) {
		     return Math.floor(Math.random() * (max - min + 1)) + min;
	 }


	tQuery.registerStatic('createPlanet', function(opts){
		var url		= 'img/world.png';
		var object	= tQuery.createSphere();
		object.material(new THREE.MeshLambertMaterial({
			ambient	: 0x888888,
			color	: 0x888888,
			map	: THREE.ImageUtils.loadTexture(url)
		}));
		return object;
	});

	for(i=0;i<10;i++){
		var x = getRandomInt(-10,10); 
		var y = getRandomInt(  0,10); 
		var z = getRandomInt(-10,10);
		var s = getRandomArbitary(0.1,2); 
		var blub = getRandomArbitary(1,10);
		tQuery.createPlanet().scale(s).translateX(x).translateY(y).translateZ(z).addTo(world);

		tQuery.createCheckerboard({
			segmentsW	: 10,
			segmentsH	: 10
		}).rotate(x,y,z).translateX(x).translateY(y).translateZ(z).addTo(world).scaleBy(blub);

	}

	tQuery.createCheckerboard({
		segmentsW	: 40,
		segmentsH	: 40
	}).addTo(world).scaleBy(40);
	*/

	/**/

	// Model
	/*var loader = new THREE.JSONLoader();

	loader.load( "model/blade/blade.js", function( geometry ) {

			var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( "model/blade/blade.jpg" ), ambient: 0x999999, color: 0xffffff, specular: 0xffffff, shininess: 25, morphTargets: true } );
			var mesh = new THREE.MorphAnimMesh( geometry, material );
			mesh.rotation.y = -Math.PI/2;
			//mesh.scale.set(4,4,4);
			mesh.duration = 1000*20;
			mesh.castShadow = true;
			mesh.receiveShadow = false;

			tQuery(mesh).scale(0.05).translateY(0.8).addTo(world);

			//animate();

	} );

	*/

	/*
	
	var loader = new THREE.ColladaLoader();
	var skin = null;
	loader.options.convertUpAxis = true;
	loader.load( 'model/monster/monster.dae', function ( collada ) {
				dae = collada.scene;
				skin = collada.skins[ 0 ];


				bla  = tQuery(dae).scale(0.0005).translateX(-0.3).addTo(world);

				world.loop().hook (function(){
					keyboardEvents();

					var np = dae.position;
							 //console.log("rot:" , dae.rotation);

					var h = 15;
					var g = Math.sin(worldrotx)*h;
					var a = Math.cos(worldrotx)*h;
					updateCamera(	world.tCamera(),
						[np.x + g, np.y + 5 ,np.z + a],
						[np.x , np.y     ,np.z    ]
					);
				})

				animate();

	 });



	tQuery.createDirectionalLight().addTo(world).position(10,10,3);
	tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);

	var t = 0;
	var clock = new THREE.Clock();


	function animate() {

		var delta = clock.getDelta();

		requestAnimationFrame( animate );

		if ( t > 1 ) t = 0;

		if ( skin ) {


			if( runani ){
				for ( var i = 0; i < skin.morphTargetInfluences.length; i++ ) {

					skin.morphTargetInfluences[ i ] = 0;

				}

				skin.morphTargetInfluences[ Math.floor( t * 30 ) ] = 1;

				t += delta;
			}


		}


	}
	*/

function keyboardEvents(){

	
	if( keyboard.pressed('w') ){

	console.log(' pressed w ');

	}

	/*
	action = false;
	if( tQuery.keyboard().pressed('w') )  {
		if(direction != 'w'){
			dae.rotation.y = 1.5;
		}else{
			bla.translateZ(-0.1);
		}
		direction = 'w';
		action = true;
	}
	if( tQuery.keyboard().pressed('a') ) {
		if(direction != 'a'){
			dae.rotation.y = 3.3 ;
		}else{
			bla.translateX(-0.1);	
		}
		direction = 'a';
		action = true;
	}
	if( tQuery.keyboard().pressed('s') ) {
		if(direction != 's'){
			dae.rotation.y = -1.5;
		}else{
			bla.translateZ(0.1);	
		}
		direction = 's';
		action = true;
	}
	if( tQuery.keyboard().pressed('d') ) {
		if(direction != 'd'){
			dae.rotation.y = 0;
		}else{
			bla.translateX(0.1);
		}
		direction = 'd';
		action = true;
	}

	if( tQuery.keyboard().pressed('space') ) {
		worldrotx+=0.1;
		console.log(worldrotx);
	}	

	if( tQuery.keyboard().pressed('up') ) {
		bla.translateY(0.1);
		action = true;
	}	
	if( tQuery.keyboard().pressed('down') ) {
		bla.translateY(-0.1);
		action = true;
	}
	prev_action = action;

	if( !prev_action && !action){
		runani = false;
	}else{
		runani = true;
	}
	*/
}
});	
