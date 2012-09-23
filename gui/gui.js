

/*
	Starting with some shit
*/





$(function() {
	$( "#beginning" ).button({
		text: false,
		icons: {
			primary: "ui-icon-seek-start"
		}
	});
	$( "#rewind" ).button({
		text: false,
		icons: {
			primary: "ui-icon-seek-prev"
		}
	});
	$( "#play" ).button({
		text: false,
		icons: {
			primary: "ui-icon-play"
		}
	})
	.click(function() {
		var options;
		if ( $( this ).text() === "play" ) {
			options = {
				label: "pause",
				icons: {
					primary: "ui-icon-pause"
				}
			};
		} else {
			options = {
				label: "play",
				icons: {
					primary: "ui-icon-play"
				}
			};
		}
		$( this ).button( "option", options );
	});
	$( "#stop" ).button({
		text: false,
		icons: {
			primary: "ui-icon-stop"
		}
	})
	.click(function() {
		$( "#play" ).button( "option", {
			label: "play",
			icons: {
				primary: "ui-icon-play"
			}
		});
	});
	$( "#forward" ).button({
		text: false,
		icons: {
			primary: "ui-icon-seek-next"
		}
	});
	$( "#end" ).button({
		text: false,
		icons: {
			primary: "ui-icon-seek-end"
		}
	});
	$( "#shuffle" ).button();
	$( "#repeat" ).buttonset();
});










/*
	Create Weaponslots!
*/

// Fix the Gui element size for now

// Get Position in the middle of window top

/*
$(document).ready(function(){
	//alert("Finished loading page will now du stupid js stuff");
	
	var weaponSlots = [];

	for (i=0; i<5; i++) {
		// var divElement = new Element('div', {id: 'slot'+i, class: 'half_transparent round_corners size_big'});
		var divElement = $('<div id="'+'slot'+i+'" class="half_transparent round_corners size_big">div'+i+'</div>');
		weaponSlots[i] = divElement;
	}
	
	for (i=0; i<5; i++) {
		$("body").append(weaponSlots[i]);	
	}

});
*/
// Create Weapon slot elements ( 2 left from middle - 2 right )
//$('#dvLinkToolTip').css({ left: $(this).position().left - 300, top: $(this).position().top - 45 }).show();
