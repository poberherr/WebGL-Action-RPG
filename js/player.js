
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
	this.moveBwd = false;
	this.moveL = false;
	this.moveR = false;

	this.moveLeft = function(){
		this.mesh.rotation.y += 0.1;
	}
	this.moveRight = function(){
		this.mesh.rotation.y -= 0.1;
	}
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

	this.moveBackward = function(){
		//console.log(this.mesh.position.x+ ","+ this.mesh.position.z);
		var b = -this.mesh.rotation.y + Math.PI;
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
		if(this.moveBwd){
			this.moveBackward();
		}
		if(this.moveL){
			this.moveLeft();
		}
		if(this.moveR){
			this.moveRight();
		}
	}

};


