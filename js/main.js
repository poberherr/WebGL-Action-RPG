	var runani=true;
	var dae = null;
	var worldrotx = 0.0;

$(document).ready(function(){

	/**
 	 * Create a checkerboard tQuery.Mesh
	 */
	tQuery.registerStatic('createCheckerboard', function(opts){
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

	/* erzeuge Keyboard Object to query Keystates */
	var instance	= null;
	tQuery.registerStatic('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});			

	
	/* Create World with tquery */
	world	= tQuery.createWorld().boilerplate().start();


	// remove camera controls to be easily clickable
	world.removeCameraControls();

	/*
	world.camera().position.x = 0;
 	world.camera().position.y = 2;	
 	world.camera().position.z = 10;	
	*/	


/**
 * Returns a random number between min and max
  */
  function getRandomArbitary (min, max) {
	      return Math.random() * (max - min) + min;
  }

  /**
   * Returns a random integer between min and max
    * Using Math.round() will give you a non-uniform distribution!
	 */
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


	var loader = new THREE.ColladaLoader();
	var skin = null;
	loader.options.convertUpAxis = true;
	loader.load( 'model/monster/monster.dae', function ( collada ) {
				dae = collada.scene;
				skin = collada.skins[ 0 ];

			/*	console.log("col: list animmation", Object.keys(collada.animations));
				console.log("dae: list animmation", Object.keys(collada.dae.animations)); */

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

});	
