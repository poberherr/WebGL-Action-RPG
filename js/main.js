
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
				player.keyboardControls();
			}
			if (webglRenderer ) { 
				webglRenderer.render( scene, camera );
			}
			// Event Stuff etc ...

		}


		$(document).mousemove(function(){
			if(player){
				player.follow2DWindowTarget(mouseX,mouseY);
			}
		});


		$(document).mousedown(function(){
			if(player){
				player.mesh.playAnimation ('run', 7 );
			}
		});

		$(document).mouseup(function(){
			if(player){
				player.mesh.playAnimation ('stand',7 );
			}
		});



});	 // document ready ende
