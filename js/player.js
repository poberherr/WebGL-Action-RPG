
doublePI=2*Math.PI;

var Player = function(_camera,_mesh)
{
	this.mesh = _mesh; 		/* THREE.Object */
	this.camera = _camera; 	/* THREE.Object */
}

Player.prototype.KEY = { 
	  RIGHT:	39,
	  UP: 		38, 
	  LEFT: 	37, 
	  DOWN: 	40, 
	  SPACE: 	32,
	  W: 		87, 
	  A: 		65, 
	  S: 		83, 
	  D: 		68
};

Player.prototype.camera_r = 0;
Player.prototype.camera_phi = 0;
Player.prototype.camera_theta = 0; 
Player.prototype.activlabel = '';

Player.prototype.keyLeft = false;
Player.prototype.keyRight = false;
Player.prototype.keyUp = false;
Player.prototype.keyDown = false;
Player.prototype.keySpace = false;

Player.prototype.key_W = false;
Player.prototype.key_A = false;
Player.prototype.key_S = false;
Player.prototype.key_D = false;

Player.prototype.setCam = function(_r,_phi,_theta) 
{
	//console.log("setCam(" + _r + "," + _phi + "," + _theta + ")" );	
	//if( Math.abs(_r) === 0) return;

	if(_phi < -Math.PI){_phi = Math.PI;}
	if(_phi >  Math.PI){_phi = -Math.PI;}
	//if(_theta < -doublePI){_theta = Math.PI;}
	//if(_theta > doublePI){_theta = 0;}

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

Player.prototype.setCameraRadius = function(r) 
{
	this.setCam( r, this.camera_phi, this.camera_theta);
}

Player.prototype.zoomIn = function(dr) 
{
	this.setCameraRadius(this.camera_r - dr);
}

Player.prototype.zoomOut = function(dr) 
{
	this.setCameraRadius(this.camera_r + dr);
}

Player.prototype.turnCameraLeft = function(dz) 
{
	this.setCam(this.camera_r, this.camera_phi -dz, this.camera_theta);
}

Player.prototype.turnCameraRight = function(dz) 
{
	this.setCam(this.camera_r, this.camera_phi +dz , this.camera_theta);
}

Player.prototype.setAnimActiv = function(label,fps)
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
   Player.prototype.follow2DWindowTarget = function(x,y)
   {
   var g = Math.atan((-y)/x) * 180/Math.PI;
   var b = g * Math.PI/180;
   if(x < 0){
   b += Math.PI;
   }	
   this.mesh.rotation.y = b;
   this.mesh.rotation.y %= doublePI;
   }
 */

Player.prototype.moveLeft = function()
{
	this.mesh.rotation.y += 0.1;
	this.mesh.rotation.y %= doublePI;
}
Player.prototype.moveRight = function()
{
	this.mesh.rotation.y -= 0.1;
	this.mesh.rotation.y %= doublePI;
}

Player.prototype.moveForward = function()
{
	var b = -this.mesh.rotation.y;
	var dz = Math.sin(b);
	var dx = Math.cos(b);
	this.mesh.position.x += dx;
	this.mesh.position.z += dz;
	this.setCam(this.camera_r, this.camera_phi , this.camera_theta );
}

Player.prototype.moveBackward = function()
{
	var b = -this.mesh.rotation.y + Math.PI;
	var dz = Math.sin(b);
	var dx = Math.cos(b);
	this.mesh.position.x += dx;
	this.mesh.position.z += dz;
	this.setCam(this.camera_r, this.camera_phi , this.camera_theta );
}

Player.prototype.jump = function()
{
}

Player.prototype.move = function()
{

	if(this.key_W){
		this.moveForward();
	}
	if(this.key_S){
		this.moveBackward();
	}
	if(this.key_A){
		this.moveLeft();
	}
	if(this.key_D){
		this.moveRight();
	}
	if(this.keyLeft){
		this.turnCameraLeft(0.1);
	}
	if(this.keyRight){
		this.turnCameraRight(0.1);
	}
	if(this.keyUp){
		this.zoomIn(1);
	}
	if(this.keyDown){
		this.zoomOut(1);
	}
	if(this.keySpace){
		this.jump();
	}

}


