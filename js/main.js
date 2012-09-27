
$(document).ready(function(){


		var player;
		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		var container,stats;
		var camera, scene;
		var webglRenderer;
		// temp for mesh and geom THREE.Objects
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		// get mouse coordinates
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		init();
		animate();

		function init() {

			
			camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
			scene = new THREE.Scene();

			// LIGHTS

			//var ambient = new THREE.AmbientLight( 0x221100 );
			var ambient = new THREE.AmbientLight( 0xFFFFFF );
			scene.add( ambient );

			/*
			var directionalLight = new THREE.DirectionalLight( 0xffeedd );
			directionalLight.position.set( 0, -70, 100 ).normalize();
			scene.add( directionalLight );
			*/	

			//////////////
			// GEOMETRY //
			//////////////

			// most objects displayed are a "mesh":
			//  a collection of points ("geometry") and
			//  a set of surface parameters ("material")	

			// Sphere parameters: radius, segments along width, segments along height
			var sphereGeometry = new THREE.SphereGeometry( 30, 32, 16 ); 
			// use a "lambert" material rather than "basic" for realistic lighting.
			//   (don't forget to add (at least one) light!)
			var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} ); 
			var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
			sphere.position.set(100, 10, -35);
			scene.add(sphere);

			// Create an array of materials to be used in a cube, one for each side
			var cubeMaterialArray = [];
			// order to add materials: x+,x-,y+,y-,z+,z-
			cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
			cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
			cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
			cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
			cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
			cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
			// Cube parameters: width (x), height (y), depth (z), 
			//        (optional) segments along x, segments along y, segments along z, materials array
			var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50, 1, 1, 1, cubeMaterialArray );
			// using THREE.MeshFaceMaterial() in the constructor below
			//   causes the mesh to use the materials stored in the geometry
			cube = new THREE.Mesh( cubeGeometry, new THREE.MeshFaceMaterial() );
			cube.position.set(-100, 25, -35);
			scene.add( cube );		

			// create a set of coordinate axes to help orient user
			// default size is 100 pixels in each direction; change size by setting scale
			var axes = new THREE.AxisHelper();
			axes.scale.set( 1, 1, 1 );
			scene.add( axes );

			///////////
			// FLOOR //
			///////////

			// note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
			var floorTexture = new THREE.ImageUtils.loadTexture( 'img/checkerboard.jpg' );
			floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
			floorTexture.repeat.set( 10, 10 );
			var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
			var floorGeometry = new THREE.PlaneGeometry(1000, 1000,  1);
			var floor = new THREE.Mesh(floorGeometry, floorMaterial);
			floor.rotation.x-=Math.PI/2;
			floor.position.y = -0.5;
			floor.doubleSided = true;
			scene.add(floor);

			/////////
			// SKY //
			/////////

			// recommend either a skybox or fog effect (can't use both at the same time) 
			// without one of these, the scene's background color is determined by webpage background

			// make sure the camera's "far" value is large enough so that it will render the skyBox!
			var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
			var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff } );
			var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
			skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
			scene.add(skyBox);

			// fog must be added to scene before first render
			scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );


			// RENDERER

			webglRenderer = new THREE.WebGLRenderer();
			webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
			//webglRenderer.domElement.style.position = "relative";
			document.body.appendChild( webglRenderer.domElement );

			// STATS

			/**/
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = 0;//window.innerHeight-100; 
			stats.domElement.style.zIndex = 100;
			document.body.appendChild( stats.domElement );
			/**/
			//

			var cbCreatePlayer = function( geometry ) {

			material = new THREE.MeshPhongMaterial(
							{ map: THREE.ImageUtils.loadTexture( "model/blade/blade.jpg" ), 
							ambient: 0x999999, 
							color: 0xffffff, 
							specular: 0xffffff, 
							shininess: 25, 
							morphTargets: true 
							} );

				var mesh = new THREE.MorphAnimMesh( geometry, material );
				mesh.rotation.y = -Math.PI/2;
				mesh.scale.set(0.2,0.2,0.2);
				mesh.position.y += 25;
				mesh.duration = 1000*20;
				mesh.castShadow = true;
				mesh.receiveShadow = false;
				//mesh.position.set( -80, 0, 50 );
				player = new Player(camera,mesh);

				//var charSpeed = 200;
			
				player.mesh.parseAnimations(); // << Funkton fuer Faule P.O.'s :-P 	
				player.mesh.playAnimation ('stand',7 );
				player.setCam(15,0,0);
				scene.add( mesh );
			} 


			var loader = new THREE.JSONLoader();

			loader.load( "model/blade/blade.js", cbCreatePlayer);
			
			window.addEventListener( 'resize', onWindowResize, false );

		}

		function onWindowResize() {

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			webglRenderer.setSize( window.innerWidth, window.innerHeight );

		}

		function onDocumentMouseMove(event) {

			mouseX = ( event.clientX - windowHalfX );
			mouseY = ( event.clientY - windowHalfY );

		}

		//

		function animate() {


			requestAnimationFrame( animate );

			render();
			stats.update();

		}


		// ***++++++++++++++++++++++++++++++++++++++++++++++
		var delta;
		var time;
		var oldTime;
		// ***++++++++++++++++++++++++++++++++++++++++++++++

		function render() {

		// ***++++++++++++++++++++++++++++++++++++++++++++++
			
			time = new Date().getTime();
			delta = (time - oldTime);
			oldTime = time;
			
			//time = new Date().getTime();
			//delta = new Date().now%60; 
			//console.log(delta);
			//oldTime = time;

			if (isNaN(delta) || delta > 1000 || delta == 0 ) {
				delta = 1000/60;
			}

		// ***++++++++++++++++++++++++++++++++++++++++++++++
			if(player ) {
				player.mesh.updateAnimation(delta);
				//player.playAnimation();
				//player.keyboardControls();
				player.move();
			}
			if (webglRenderer ) { 
				webglRenderer.render( scene, camera );
			}
			// Event Stuff etc ...

		}


		function setAnim(mesh,label,fps)
		{
			player.mesh.playAnimation(label,fps);
		}

		/*$(document).mousemove(function(){
			if(player){
				player.follow2DWindowTarget(mouseX,mouseY);
			}
		});*/

		/*
		$(document).mousedown(function(){
			if(player){
				player.setAnimActiv('run');
			}
		});

		$(document).mouseup(function(){
			if(player){
				player.setAnimActiv('stand');
			}
		});

		*/

	
	function onKeyDown(event){
				//console.log("down " + event.keyCode);
			if(event.keyCode == 87){
				//this.move_fwd = true;
				player.setAnimActiv('run');
				player.mesh.setDirectionForward();
				player.moveFwd = true;
			}else
			if(event.keyCode == 83){
				//this.move_fwd = true;
				player.setAnimActiv('run');
				player.mesh.setDirectionBackward();
				player.moveBwd = true;
			}
			if(event.keyCode == 65){
				player.moveL = true;
			}else
			if(event.keyCode == 68){
				player.moveR = true;
			}
	}

	function onKeyUp(event){
				//console.log("Up " + event.keyCode);
			if(event.keyCode == 87){
				//this.move_fwd = false;
				player.setAnimActiv('stand');
				player.mesh.setDirectionForward();
				player.moveFwd = false;
			}else
			if(event.keyCode == 83){
				//this.move_fwd = true;
				player.setAnimActiv('stand');
				player.mesh.setDirectionForward();
				player.moveBwd = false;
			}
			if(event.keyCode == 65){
				player.moveL = false;
			}else
			if(event.keyCode == 68){
				player.moveR = false;
			}
	}

	document.addEventListener("keydown", onKeyDown, false);
	document.addEventListener("keyup", onKeyUp, false);

});	 // document ready ende
