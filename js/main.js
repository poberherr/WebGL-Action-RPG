
$(document).ready(function(){

		var onGround = true;
		var gravity = 1;
		var yspeed = 0;

		var floor;
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
			//camera.position.y = 50;
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
			floor = new THREE.Mesh(floorGeometry, floorMaterial);
			floor.rotation.x-=Math.PI/2;
			floor.position.y = 0.0;
			floor.doubleSided = false;
			scene.add(floor);

			/////////
			// SKY //
			/////////

			// recommend either a skybox or fog effect (can't use both at the same time) 
			// without one of these, the scene's background color is determined by webpage background

			// make sure the camera's "far" value is large enough so that it will render the skyBox!
			//var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
			//var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff } );
			//var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
			//skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
			//scene.add(skyBox);

			// fog must be added to scene before first render
			//scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );


			// RENDERER

			webglRenderer = new THREE.WebGLRenderer();
			webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
			//webglRenderer.domElement.style.position = "relative";
			document.body.appendChild( webglRenderer.domElement );

			// STATS

			/*
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = 0;//window.innerHeight-100; 
			stats.domElement.style.zIndex = 100;
			document.body.appendChild( stats.domElement );
			*/
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
				player = new Player(camera,mesh);
				player.mesh.parseAnimations();// << Funkton fuer Faule P.O.'s :-P 	
				player.mesh.playAnimation ('stand',7 );
				player.setCam(-15,0,0);
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

		function animate() 
		{
			requestAnimationFrame( animate );
			render();
			//stats.update();
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
			if(player) {
				player.mesh.updateAnimation(delta);
				player.move();
				control();
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
		/*
		$(document).mousemove(function(){
			if(player){player.follow2DWindowTarget(mouseX,mouseY);}
		});
		$(document).mousedown(function(){
			if(player){player.setAnimActiv('run');}
		});
		$(document).mouseup(function(){
			if(player){player.setAnimActiv('stand');}
		});
		*/

	function onkeyDown (event) 
	{
			if(event.keyCode == player.KEY.UP){
				player.keyUp = true;
			}
			if(event.keyCode == player.KEY.LEFT){
				player.keyLeft = true;
			}
			if(event.keyCode == player.KEY.RIGHT){
				player.keyRight = true;
			}
			if(event.keyCode == player.KEY.DOWN){
				player.keyDown = true;
			}
			if(event.keyCode == player.KEY.SPACE){
				player.keySpace = true;
			}
			if(event.keyCode == player.KEY.W){
				player.key_W = true;
				player.setAnimActiv('run');
				player.mesh.setDirectionForward();
			}
			if(event.keyCode == player.KEY.A){
				player.key_A = true;
			}
			if(event.keyCode == player.KEY.S){
				player.key_S = true;
				player.setAnimActiv('run');
				player.mesh.setDirectionBackward();
			}
			if(event.keyCode == player.KEY.D){
				player.key_D = true;
			}
	}

	function onkeyUp(event) 
	{
		if(event.keyCode == player.KEY.UP){
			player.keyUp = false;
		}
		if(event.keyCode == player.KEY.LEFT){
			player.keyLeft = false;
		}
		if(event.keyCode == player.KEY.RIGHT){
			player.keyRight = false;
		}
		if(event.keyCode == player.KEY.DOWN){
			player.keyDown = false;
		}
		if(event.keyCode == player.KEY.SPACE){
			player.keySpace = false;
		}
		if(event.keyCode == player.KEY.W){
			player.key_W = false;
			player.mesh.setDirectionForward();
			player.setAnimActiv('stand');
		}	
		if(event.keyCode == player.KEY.A){
			player.key_A = false;
		}
		if(event.keyCode == player.KEY.S){
			player.key_S = false;
			player.mesh.setDirectionForward();
			player.setAnimActiv('stand');
		}
		if(event.keyCode == player.KEY.D){
			player.key_D = false;
		}
	}

	function control() {
		var speed = 10;
		var halfSize = 50;

		var nearHalfSize = halfSize-5;
		if (player.keySpace && onGround) {
				yspeed = 30;
				onGround = false;
		}

		onGround = false;

		// y
		yspeed -= gravity;

		var down_vector = new THREE.Vector3( 0, -1, 0 );
		var up_vector = new THREE.Vector3( 0, 1, 0 );

		var bl = new THREE.Vector3( player.mesh.position.x-halfSize, player.mesh.position.y, player.mesh.position.z-halfSize );
		var br = new THREE.Vector3( player.mesh.position.x+halfSize, player.mesh.position.y, player.mesh.position.z-halfSize );
		var fl = new THREE.Vector3( player.mesh.position.x-halfSize, player.mesh.position.y, player.mesh.position.z+halfSize );
		var fr = new THREE.Vector3( player.mesh.position.x+halfSize, player.mesh.position.y, player.mesh.position.z+halfSize );


		// down
		if (yspeed < 0) {
			// bl
			var bl_ray = new THREE.Ray( bl, down_vector );
			var bl_intersects = bl_ray.intersectObject(floor);

			if ( bl_intersects.length > 0 && bl_intersects[0].distance < halfSize ) {
				player.mesh.position.y = bl_intersects[0].point.y+halfSize;
				onGround = true;
			}
			// br
			var br_ray = new THREE.Ray( br, down_vector );
			var br_intersects = br_ray.intersectObject(floor );
			if ( br_intersects.length > 0 && br_intersects[0].distance < halfSize ) {
				player.mesh.position.y = br_intersects[0].point.y+halfSize;
				onGround = true;
			}
			// fl
			var fl_ray = new THREE.Ray( fl, down_vector );
			var fl_intersects = fl_ray.intersectObject( floor  );
			if ( fl_intersects.length > 0 && fl_intersects[0].distance < halfSize ) {
				player.mesh.position.y = fl_intersects[0].point.y+halfSize;
				onGround = true;
			}	
			// fr
			var fr_ray = new THREE.Ray( fr, down_vector );
			var fr_intersects = fr_ray.intersectObject( floor );
			if ( fr_intersects.length > 0 && fr_intersects[0].distance < halfSize ) {
				player.mesh.position.y = fr_intersects[0].point.y+halfSize;
				onGround = true;
			}	
		}
		// up
		if (yspeed > 0) {
			// bl
			var bl_ray = new THREE.Ray( bl, up_vector );
			var bl_intersects = bl_ray.intersectObject(floor);
			if ( bl_intersects.length > 0 && bl_intersects[0].distance < halfSize ) {
				player.mesh.position.y = bl_intersects[0].point.y-halfSize;
				yspeed = 0;
			}
			// br
			var br_ray = new THREE.Ray( br, up_vector );
			var br_intersects = br_ray.intersectObject(floor);
			if ( br_intersects.length > 0 && br_intersects[0].distance < halfSize ) {
				player.mesh.position.y = br_intersects[0].point.y-halfSize;
				yspeed = 0;
			}
			// fl
			var fl_ray = new THREE.Ray( fl, up_vector );
			var fl_intersects = fl_ray.intersectObject(floor);
			if ( fl_intersects.length > 0 && fl_intersects[0].distance < halfSize ) {
				player.mesh.position.y = fl_intersects[0].point.y-halfSize;
				yspeed = 0;
			}	
			// fr
			var fr_ray = new THREE.Ray( fr, up_vector );
			var fr_intersects = fr_ray.intersectObject(floor);
			if ( fr_intersects.length > 0 && fr_intersects[0].distance < halfSize ) {
				player.mesh.position.y = fr_intersects[0].point.y-halfSize;
				yspeed = 0;
			}	
		}

		if (onGround) {
			yspeed = 0;
		}


		player.mesh.updateMatrix();

		// ray
		var f_vector = new THREE.Vector3( 0, 0, -1 );
		var b_vector = new THREE.Vector3( 0, 0, 1 );
		var l_vector = new THREE.Vector3( -1, 0, 0 );
		var r_vector = new THREE.Vector3( 1, 0, 0 );

		var left = new THREE.Vector3( player.mesh.position.x-halfSize, player.mesh.position.y-nearHalfSize, player.mesh.position.z );
		var right = new THREE.Vector3( player.mesh.position.x+halfSize, player.mesh.position.y-nearHalfSize, player.mesh.position.z );
		var front = new THREE.Vector3( player.mesh.position.x, player.mesh.position.y-nearHalfSize, player.mesh.position.z+halfSize );
		var back = new THREE.Vector3( player.mesh.position.x, player.mesh.position.y-nearHalfSize, player.mesh.position.z-halfSize );

		// front
		if (player.key_W) {
			var left_ray = new THREE.Ray( left, f_vector );
			var left_intersects = left_ray.intersectObject(floor);
			if ( left_intersects.length > 0 && left_intersects[0].distance < halfSize ) {
				player.mesh.position.z = left_intersects[0].point.z+halfSize+1;
			}
			var right_ray = new THREE.Ray( right, f_vector );
			var right_intersects = right_ray.intersectObject(floor);
			if ( right_intersects.length > 0 && right_intersects[0].distance < halfSize ) {
				player.mesh.position.z = right_intersects[0].point.z+halfSize+1;
			}
		}
		// back
		if (player.key_S) {
			var left_ray = new THREE.Ray( left, b_vector );
			var left_intersects = left_ray.intersectObject(floor);
			if ( left_intersects.length > 0 && left_intersects[0].distance < halfSize ) {
				player.mesh.position.z = left_intersects[0].point.z-halfSize-1;
			}
			var right_ray = new THREE.Ray( right, b_vector );
			var right_intersects = right_ray.intersectObject(floor);
			if ( right_intersects.length > 0 && right_intersects[0].distance < halfSize ) {
				player.mesh.position.z = right_intersects[0].point.z-halfSize-1;
			}
		}				
		// right
		if (player.key_D) {
			var back_ray = new THREE.Ray( back, r_vector );
			var back_intersects = back_ray.intersectObject(floor);
			if ( back_intersects.length > 0 && back_intersects[0].distance < halfSize ) {
				player.mesh.position.x = back_intersects[0].point.x-halfSize-1;
			}
			var front_ray = new THREE.Ray( front, r_vector );
			var front_intersects = front_ray.intersectObject(floor);
			if ( front_intersects.length > 0 && front_intersects[0].distance < halfSize ) {
				player.mesh.position.x = front_intersects[0].point.x-halfSize-1;
			}
		}
		// left
		if (player.key_A) {
			var back_ray = new THREE.Ray( back, l_vector );
			var back_intersects = back_ray.intersectObject(floor);
			if ( back_intersects.length > 0 && back_intersects[0].distance < halfSize ) {
				player.mesh.position.x = back_intersects[0].point.x+halfSize+1;
			}
			var front_ray = new THREE.Ray( front, l_vector );
			var front_intersects = front_ray.intersectObject(floor);
			if ( front_intersects.length > 0 && front_intersects[0].distance < halfSize ) {
				player.mesh.position.x = front_intersects[0].point.x+halfSize+1;
			}
		}
		player.mesh.updateMatrix();

	}


	document.addEventListener("keydown", onkeyDown, false);
	document.addEventListener("keyup", onkeyUp, false);

});	 // document ready ende
