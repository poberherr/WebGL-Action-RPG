
Player = function(_camera,_mesh) {

	//this.keyboard =  new THREEx.KeyboardState();
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


	this.setAnimActiv = function(label){
		if(label != this.activlabel){
			this.mesh.playAnimation (label,7 );
			this.activlabel = label;
		}
	}

	this.follow2DWindowTarget = function(x,y)
	{
		var g = Math.atan((-y)/x) * 180/Math.PI;
		var b = g * Math.PI/180;
		if(x < 0){
			b += Math.PI;
		}	
		this.mesh.rotation.y = b;
	}

	this.moveFwd = false;

	this.moveForward = function(){
		//console.log(this.mesh.position.x+ ","+ this.mesh.position.z);
		var b = -this.mesh.rotation.y;
		//var g = b/Math.PI * 180;
		var g = b;
		//console.log(g);
		var dz = Math.sin(g);
		//console.log("dz " + dz);
		var dx = Math.cos(g);
		//console.log("dx " + dx);
		var new_x = this.mesh.position.x + dx;
		var new_z = this.mesh.position.z + dz;
		this.mesh.position.x += dx;
		this.mesh.position.z += dz;
		this.setCam(this.camera_r,this.camera_phi , this.camera_theta );
		///his.camera.lookAt(this.mesh.position);
		//console.log(new_x + ","+ new_z);
			
	}

	this.move = function(){
		if(this.moveFwd){
			this.moveForward();
		}
	}
	//this.keyboardControls = function()
	//{
		//if(this.move_fwd){
		//	this.setAnimActiv('run');
			//this.mesh.setDirectionForward();
		//}
			//console.log("not moving forward");
			//this.setAnimActiv('stand');
		//console.log(this.keyboard.pressed('w'));
		/*
		// WSAD
		if( this.keyboard.pressed('w')) {
			this.setAnimActiv('run');
			this.mesh.setDirectionForward();
		}
		if( this.keyboard.pressed('s') ) {
			this.setAnimActiv('run');
			this.mesh.setDirectionBackward();
		}
		if( this.keyboard.pressed('a') ) {
		}	
		if( this.keyboard.pressed('d') ) {
		}
		if( this.keyboard.pressed('space') ) {
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
		*/
	//}

};


