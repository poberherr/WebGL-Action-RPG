
//$(document).ready(function(){

		var player;
		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		var container,stats;
		var camera, scene;
		var webglRenderer;
		var oldTime;
		// temp for mesh and geom THREE.Objects
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		// get mouse coordinates
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		init();
		animate();

		function init() {

			
			//container = document.createElement( 'div' );
			//document.body.appendChild( container );
			camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
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


			// LIGHTS

			//var ambient = new THREE.AmbientLight( 0x221100 );
			var ambient = new THREE.AmbientLight( 0xFFFFFF );
			scene.add( ambient );

			/*
			var directionalLight = new THREE.DirectionalLight( 0xffeedd );
			directionalLight.position.set( 0, -70, 100 ).normalize();
			scene.add( directionalLight );
			*/	

			// RENDERER

			webglRenderer = new THREE.WebGLRenderer();
			webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
			//webglRenderer.domElement.style.position = "relative";
			document.body.appendChild( webglRenderer.domElement );

			// STATS

			/*
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = window.innerHeight-100; 
			stats.domElement.style.zIndex = 100;
			container.appendChild( stats.domElement );
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
				mesh.duration = 1000*20;
				mesh.castShadow = true;
				mesh.receiveShadow = false;
				//mesh.position.set( -80, FLOOR, 50 );
				player = new Player(camera,mesh);
				var charSpeed = 100;
				
				//player.setAnimation( charSpeed, 40,   0 ); // stand
				player.setAnimation( charSpeed,  6,  40 ); // run
				//player.setAnimation( charSpeed,  8,  46 ); // attack
				//player.setAnimation( charSpeed, 12,  54 ); // pain
				//player.setAnimation( charSpeed,  6,  66 ); // jump 
				
				//player.setAnimation( charSpeed, 12,  72 ); // flip off

				player.setCam(15,0,0);
				scene.add( mesh );

				//player.mesh.playAnimation('attack1',24);
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
			//stats.update();

		}


		/*		
		duration = 600; 
		keyframes = 6; 
		offset_keyframe_running = 40;
		
		duration = 4000; 
		keyframes = 40; 
		offset_keyframe_running = 0;

		duration = 600; 
		keyframes = 6; 
		offset_keyframe_running = 66;
		

		var interpolation = duration / keyframes;
		var lastKeyframe = offset_keyframe_running;
		var currentKeyframe = offset_keyframe_running + 1;
		
		function playAnimation(player)
		{
				var mesh = player.mesh;

				// Alternate morph targets
				var time = Date.now() % player.duration;

				var keyframe = Math.floor( time / player.interpolation ) + player.offset_keyframe_running;

				if ( keyframe != player.currentKeyframe ) {

					mesh.morphTargetInfluences[ player.lastKeyframe ] = 0;
					mesh.morphTargetInfluences[ player.currentKeyframe ] = 1;
					mesh.morphTargetInfluences[ player.keyframe ] = 0;

					player.lastKeyframe = player.currentKeyframe;
					player.currentKeyframe = keyframe;

					//console.log( mesh.morphTargetInfluences );
				}
				mesh.morphTargetInfluences[ keyframe ] = ( time % player.interpolation ) / player.interpolation;
				mesh.morphTargetInfluences[ player.lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];

		}
		*/
		
		function render() {

			if(player ) {
				player.playAnimation();
				player.keyboardControls();
			}
			if (webglRenderer ) { 
				webglRenderer.render( scene, camera );
			}
			// Event Stuff etc ...

		}



//});	 // document ready ende
