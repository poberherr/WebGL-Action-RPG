Player = function(_camera,_mesh) {

    /// Variables


	// not directly assossotiated with the player Object
	this.sin = Math.sin;
	this.cos = Math.cos;
	this.doublePI=2*Math.PI;

	// Camera Stuff

	this.camera_r = 0;
	this.camera_phi = 0;
	this.camera_theta = 0; 
	//this.animationState = null;

	this.camera = _camera; /* THREE.Object */


	// Mesh Stuff
	this.mesh = _mesh; /* THREE.Object */

	//this.camera.position = this.mesh.position;
	//this.camera.position.z =15;
	// Animation Stuff
	this.activlabel = '';

	/// Methods
	/*this.setPos = function(_x,_y,_z){
		this.mesh.position.x = _x;
		this.mesh.position.y = _y;
		this.mesh.position.z = _z;
	}*/

	/*this.setDir = function(_alpha){
		this.mesh.rotation.y = _alpha;
	}*/

	this.setCam = function(_r,_phi,_theta) 
	{
		//console.log("setCam(" + _r + "," + _phi + "," + _theta + ")" );	
		//if( Math.abs(_r) === 0) return;

		if(_phi < -Math.PI){_phi = Math.PI;}
		if(_phi >  Math.PI){_phi = -Math.PI;}
		//if(_theta < -this.doublePI){_theta = Math.PI;}
		//if(_theta > this.doublePI){_theta = 0;}

		this.camera_r = _r;
		this.camera_phi = _phi;
		this.camera_theta = _theta;
			
		// calc once
		var tmp = Math.sin(_phi) * _r;
		this.camera.position.x = tmp * Math.cos(_theta) + this.mesh.position.x;
		this.camera.position.y = tmp * Math.sin(_theta) + this.mesh.position.y;
		this.camera.position.z =  _r * Math.cos(_phi)   + this.mesh.position.z;

		//console.log(this.camera.position);
		//console.log(_r * Math.cos(_phi) + this.mesh.position.z);	
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
		this.setCam(this.camera_r, this.camera_phi -dz, this.camera_theta);
	}

	this.turnCameraRight = function(dz) {
		this.setCam(this.camera_r, this.camera_phi +dz , this.camera_theta);
	}

	this.turnCameraUp = function(dz) {
	}
	this.turnCameraDown = function(dz) {

	}

	this.setAnimActiv = function(label,fps)
	{
		if(label !== this.activlabel){
			if(typeof (fps) === 'undefined'){
				fps = 7;
			}
			this.mesh.playAnimation (label,fps );
			this.activlabel = label;
		}
	}
	/*
	this.follow2DWindowTarget = function(x,y)
	{
		var g = Math.atan((-y)/x) * 180/Math.PI;
		var b = g * Math.PI/180;
		if(x < 0){
			b += Math.PI;
		}	
		this.mesh.rotation.y = b;
		this.mesh.rotation.y %= this.doublePI;
	}
	*/

	this.moveF = false;
	this.moveB = false;
	this.moveL = false;
	this.moveR = false;
	this.turnCamL = false;
	this.turnCamR = false;
	this.zoomCamIn = false;
	this.zoomCamOut = false;

	this.moveJ = false;

	this.moveLeft = function()
	{
		this.mesh.rotation.y += 0.1;
		this.mesh.rotation.y %= this.doublePI;
	}
	this.moveRight = function()
	{
		this.mesh.rotation.y -= 0.1;
		this.mesh.rotation.y %= this.doublePI;
	}

	this.moveForward = function()
	{
		var b = -this.mesh.rotation.y;
		var dz = Math.sin(b);
		var dx = Math.cos(b);
		this.mesh.position.x += dx;
		this.mesh.position.z += dz;
		this.setCam(this.camera_r, this.camera_phi , this.camera_theta );
	}

	this.moveBackward = function()
	{
		var b = -this.mesh.rotation.y + Math.PI;
		var dz = Math.sin(b);
		var dx = Math.cos(b);
		this.mesh.position.x += dx;
		this.mesh.position.z += dz;
		this.setCam(this.camera_r, this.camera_phi , this.camera_theta );
	}
	
	this.moveJump = function()
	{
		return;
		//Later do something here
	}

	this.move = function()
	{
		if(this.moveF){
			this.moveForward();
		}
		if(this.moveB){
			this.moveBackward();
		}
		if(this.moveL){
			this.moveLeft();
		}
		if(this.moveR){
			this.moveRight();
		}
		if(this.turnCamL){
			this.turnCameraLeft(0.1);
		}
		if(this.turnCamR){
			this.turnCameraRight(0.1);
		}
		if(this.zoomCamIn){
			this.zoomIn(1);
		}
		if(this.zoomCamOut){
			this.zoomOut(1);
		}
		if(this.moveJ){
			this.moveJump();
		}

	}

// ------------
};


