
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
	var world	= tQuery.createWorld().boilerplate().start();


	// remove camera controls to be easily clickable
	world.removeCameraControls();


	world.camera().position.x = 0;
 	world.camera().position.y = 2;	
 	world.camera().position.z = 10;	
		

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

	var planet3	= tQuery.createPlanet().translateY(1).addTo(world);

	tQuery.createCheckerboard({
		segmentsW	: 10,
		segmentsH	: 10
	}).addTo(world).scaleBy(10);


	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'model/monster/monster.dae', function ( collada ) {
				var dae = collada.scene;
				var skin = collada.skins[ 0 ];

				bla  = tQuery(dae).scale(0.0005).translateX(-0.3).addTo(world);

				world.loop().hook (function(){
					keyboardEvents();

					var np = dae.position;
					updateCamera(	world.tCamera(),
						[np.x, np.y + 1 ,np.z + 5],
						[np.x, np.y     ,np.z    ]
					);
				})


	 });



	tQuery.createDirectionalLight().addTo(world).position(10,10,3);
	tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);



});	
