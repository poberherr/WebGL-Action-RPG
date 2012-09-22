
/*
	TODO: Get mouse input vor moving camera
		a) mousewheel zoom in and zoom out
		b) right mouse + move = camera angle change in aspect to player
			=> camera new pos
*/


function updateCamera(camera, newpos, lookAt) {

	camera.position.x = newpos[0];
	camera.position.y = newpos[1];
	camera.position.z = newpos[2];

	camera.lookAt(new THREE.Vector3(
		lookAt[0],
		lookAt[1],
		lookAt[2]
	));
}
