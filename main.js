$(document).ready(function(){

	/**
 * Create a checkerboard tQuery.Mesh
*/
	tQuery.register('createCheckerboard', function(opts){
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
	var material	= new THREE.MeshFaceMaterial();
	var mesh	= new THREE.Mesh(geometry, material);
	mesh.rotation.x	= -Math.PI/2;
	// return the tQuery
	return tQuery(mesh);
});

	/* erzeuge Keyboard Object to query Keystates */
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});			

	
	/* Create World with tquery */
	var world	= tQuery.createWorld().boilerplate().start();


	// remove camera controls to be easily clickable
	world.removeCameraControls();


	//console.log("camera.y: " + world.camera().position.y);
 	world.camera().position.x = 0;
 	world.camera().position.y = 1;	
 	world.camera().position.z = 10;	
	//console.log("camera.y: " + world.camera().position.y);

		

	tQuery.register('createPlanet', function(opts){
	
		var baseUrl	= tQuery.createPlanet.baseUrl;
		//var url		= baseUrl + 'images/moon_1024.jpg';
		var url		= baseUrl + 'images/world.png';
		var object	= tQuery.createSphere();
		object.material(new THREE.MeshLambertMaterial({
			ambient	: 0x888888,
			color	: 0x888888,
			map	: THREE.ImageUtils.loadTexture(url)
		}));
		return object;
	});


	// configure module baseUrl
	tQuery.createPlanet.baseUrl	= "../";

	// create the planet
	//var eath = tQuery.createPlanet().addTo(world);
	
	var geometry = new THREE.CubeGeometry(1,1,1);
	//geometry.dynamic= true;
	//var material	= tQuery.defaultObject3DMaterial;
	var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/crate.gif' ) });
	var mesh     = new THREE.Mesh(geometry, material)

	//var crate = tQuery(mesh).addTo(world);


	var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;

	bla = null;

	var cangle = 0;
	loader.load( '/three.js/examples/models/collada/monster/monster.dae', function ( collada ) {
				var dae = collada.scene;
				var skin = collada.skins[ 0 ];

				bla  = tQuery(dae).scale(0.0002).translateY(0.4).translateX(-0.3).addTo(world);

				world.loop().hook (function(){
					keyboardEvents();

					var np = dae.position;
					updateCamera(	world.tCamera(),
						[np.x, np.y + 1 ,np.z + 5],
						[np.x, np.y     ,np.z    ]
					);
				})


	 });

	//var planet2	= tQuery.createPlanet().id('obj2').translateX(2).addTo(world);
	var planet3	= tQuery.createPlanet().translateY(1).addTo(world);

	tQuery.createCheckerboard({
		segmentsW	: 10,
		segmentsH	: 10
	}).addTo(world).scaleBy(10);


	// setup light
	//tQuery.createDirectionalLight().addTo(world).position(0,0,0);
	tQuery.createDirectionalLight().addTo(world).position(10,10,3);

	tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);



});	
