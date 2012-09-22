

/*
	Starting with some shit
*/


// Load the Jquery stuff from google
//<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>






/*
	Create Weaponslots!
*/

// Fix the Gui element size for now

// Get Position in the middle of window top



$(document).ready(function(){
	/*alert("Finished loading page will now du stupid js stuff");*/
	
	var weaponSlots = [];

	for (i=0; i<5; i++) {
		/* var divElement = new Element('div', {id: 'slot'+i, class: 'half_transparent round_corners size_big'}); */
		var divElement = $('<div id="'+'slot'+i+'" class="half_transparent round_corners size_big">div'+i+'</div>');
		weaponSlots[i] = divElement;
	}
	
	for (i=0; i<5; i++) {
		$("body").append(weaponSlots[i]);	
	}

});
// Create Weapon slot elements ( 2 left from middle - 2 right )
//$('#dvLinkToolTip').css({ left: $(this).position().left - 300, top: $(this).position().top - 45 }).show();
