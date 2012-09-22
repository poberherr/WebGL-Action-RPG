var direction = 's';
function keyboardEvents(){

	if( tQuery.keyboard().pressed('w') )  {
		if(direction != 'w'){
			bla.rotation(0,3,0);
		}
		bla.translateZ(-0.1);
		direction = 'w';
	}
	if( tQuery.keyboard().pressed('a') ) {
		if(direction != 'a'){
			bla.rotation(0,4.5,0);
		}
		bla.translateX(-0.1);	
		direction = 'a';
	}
	if( tQuery.keyboard().pressed('s') ) {
		if(direction != 's'){
			bla.rotation(0,0,0);
		}
		bla.translateZ(0.1);	
		direction = 's';
	}
	if( tQuery.keyboard().pressed('d') ) {
		if(direction != 'd'){
			bla.rotation(0,1.5,0);
		}
		bla.translateX(0.1);
		direction = 'd';
	}	

	if( tQuery.keyboard().pressed('right') ) {
		cangle++;//world.camera().position.x++;	
	}
	if( tQuery.keyboard().pressed('left') ) {
		cangle--;//world.camera().position.x--;
	}
}
