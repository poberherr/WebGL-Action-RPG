var direction = 'd';
var prev_action = false;
mouseX = 0;
mouseY = 0;
winW = window.innerWidth;
winH = window.innerHeight;
player_x=winW/2;
player_y=winH/2;

$(document).mousemove(function(e){
	      /*var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
		  var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
			alert(pageCoords + "," + clientCoords);*/
	mouseX = e.pageX;
	mouseY = e.pageY;


});

$(document).onclick(function(e){

	// TODO: Do magic here 

});

function keyboardEvents(){

	action = false;
	if( tQuery.keyboard().pressed('w') )  {
		if(direction != 'w'){
			dae.rotation.y = 1.5;
		}else{
			bla.translateZ(-0.1);
		}
		direction = 'w';
		action = true;
	}
	if( tQuery.keyboard().pressed('a') ) {
		if(direction != 'a'){
			dae.rotation.y = 3.3 ;
		}else{
			bla.translateX(-0.1);	
		}
		direction = 'a';
		action = true;
	}
	if( tQuery.keyboard().pressed('s') ) {
		if(direction != 's'){
			dae.rotation.y = -1.5;
		}else{
			bla.translateZ(0.1);	
		}
		direction = 's';
		action = true;
	}
	if( tQuery.keyboard().pressed('d') ) {
		if(direction != 'd'){
			dae.rotation.y = 0;
		}else{
			bla.translateX(0.1);
		}
		direction = 'd';
		action = true;
	}

	if( tQuery.keyboard().pressed('space') ) {
		worldrotx+=0.1;
		console.log(worldrotx);
	}	

	if( tQuery.keyboard().pressed('up') ) {
		bla.translateY(0.1);
		action = true;
	}	
	if( tQuery.keyboard().pressed('down') ) {
		bla.translateY(-0.1);
		action = true;
	}
	prev_action = action;

	if( !prev_action && !action){
		runani = false;
	}else{
		runani = true;
	}

}
