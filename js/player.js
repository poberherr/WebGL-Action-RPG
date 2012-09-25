
/*
 * Brainstorm:

 private:
	mesh[geom,text, pos], 
	v3D direction,

	move(direction,speed);
	rotate(directin, angle);

public:

	player( mesh )

 	int id
	string name

	set_ani( strinig ani_id )

	set_pos(x,y,z)
	set_dir(v3D)

	set_mesh(mesh)
	set_geom(geom)
	set_text(text)	

	set_cam(x,y,z,target)  <-- generisch 
	set_on_player(radius,alpha,beta);        <-- for rotating around player
		<=> set_cam( kugel berechnungen hier )

	// TODO: later
	move_up(speed)
	move_down(speed)

	move_foward(speed) 
	move_backward(speed)
	move_left(speed)
	move_right(speed)


	rotate_left(angle,speed)
	rotate_right(angle,speed)
		


	
	=> Event Functions 
		TODO: much later

*/

Player = function(_camera,_mesh) {

	this.keyboard =  new THREEx.KeyboardState();
	/// Variables

	// not directly assossotiated with the player Object
	this.sin = Math.sin;
	this.cos = Math.cos;
	this.doublePI=2*Math.PI;

	// Camera Stuff

	this.camera_r = 0;
	this.camera_phi = 0;
	this.camera_theta = 0;

	this.camera = _camera; /* THREE.Object */


	// Mesh Stuff

	this.rotX = 0;
	this.rotY  = 0; 
	this.mesh = _mesh; /* THREE.Object */


	/// Methods

	this.setPos = function(_x,_y,_z){
		this.mesh.position.x = _x;
		this.mesh.position.y = _y;
		this.mesh.position.z = _z;
	}

	this.setDir = function(_alpha){
		this.mesh.rotation.y = _alpha;
	}

	this.setCam = function(_r,_phi,_theta) {

		//console.log("setCam(" + _r + "," + _phi + "," + _theta + ")" );	

		if( _r < 0) return;
		if(_phi < -Math.PI){_phi = Math.PI;}
		if(_phi >  Math.PI){_phi = -Math.PI;}
		if(_theta < -this.doublePI){_theta = Math.PI;}
		if(_theta > this.doublePI){_theta = -Math.PI;}

		this.camera_r = _r;
		this.camera_phi = _phi;
		this.camera_theta = _theta;
			
		// calc once
		var tmp = this.sin(_phi) * _r;
		this.camera.position.x = tmp * this.cos(_theta)
								+ this.mesh.position.x;
		this.camera.position.y = tmp * this.sin(_theta)
								+ this.mesh.position.y;
		this.camera.position.z = _r * this.cos(_phi)
								+ this.mesh.position.z;

		this.camera.lookAt(this.mesh.position);
	}

	this.setCameraRadius = function(r){
			this.setCam( r, this.camera_phi, this.camera_theta);	
	}

	this.zoomIn = function(dr) {
		this.setCameraRadius(this.camera_r - dr);
	}

	this.zoomOut = function(dr) {
		this.setCameraRadius(this.camera_r + dr);
	}

	this.turnCameraLeft = function(dz) {
		this.setCam(this.camera_r,this.camera_phi -dz, this.camera_theta );
	}
	this.turnCameraRight = function(dz) {
		this.setCam(this.camera_r,this.camera_phi +dz , this.camera_theta );
	}

	this.keyboardControls = function(){

		// WSAD
		if( this.keyboard.pressed('w') ) {
			// move forward
		}	
		if( this.keyboard.pressed('s') ) {
			// move backward
		}
		if( this.keyboard.pressed('a') ) {
			// move left 
		}	
		if( this.keyboard.pressed('d') ) {
			// move right 
		}

		// Arrow Keys
		if( this.keyboard.pressed('up') ) {
			this.zoomIn(1);
		}	
		if( this.keyboard.pressed('down') ) {
			this.zoomOut(1);
		}
		if( this.keyboard.pressed('left') ) {
			this.turnCameraLeft(0.1);
		}	
		if( this.keyboard.pressed('right') ) {
			this.turnCameraRight(0.1);
		}


	}

	this.duration = 0;
	this.keyframes = 0; 
	this.offset_keyframe_running = 0;

	this.interpolation = 0; 
	this.lastKeyframe = 0; 
	this.currentKeyframe = 1; 

	this.setAnimation = function ( _speed, _keyframes, _offset_keyframe_running )
	{
		this.duration = _speed * _keyframes ; 
		this.keyframes = _keyframes; 
		this.offset_keyframe_running = _offset_keyframe_running;

		this.interpolation = this.duration / this.keyframes;
		this.lastKeyframe = this.offset_keyframe_running;
		this.currentKeyframe = this.offset_keyframe_running + 1;

	}


	this.playAnimation = function ()
	{
		var mesh = this.mesh;

		// Alternate morph targets
		var time = Date.now() % this.duration;

		var keyframe = Math.floor( time / this.interpolation ) + this.offset_keyframe_running;

		if ( keyframe != this.currentKeyframe ) {

			mesh.morphTargetInfluences[ this.lastKeyframe ] = 0;
			mesh.morphTargetInfluences[ this.currentKeyframe ] = 1;
			mesh.morphTargetInfluences[ this.keyframe ] = 0;

			this.lastKeyframe = this.currentKeyframe;
			this.currentKeyframe = keyframe;

			//console.log( mesh.morphTargetInfluences );
		}
		mesh.morphTargetInfluences[ keyframe ] = ( time % this.interpolation ) / this.interpolation;
		mesh.morphTargetInfluences[ this.lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];

	}



};


