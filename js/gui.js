

/*
	Starting with some shit
*/





$(document).ready(function(){

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
	}).click(function() {
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




toolbar_topoffset = window.innerHeight- 2*$('#toolbar').height();
console.log(window.innerHeight);
console.log(toolbar_topoffset);


$('#toolbar').css({
	"margin":"0px",
	"padding": "15px",
	"position":"absolute",
	"top": toolbar_topoffset + "px",
	"left": window.innerWidth/2 - $('#toolbar').width()/2 + "px",
	"z-index":100,
	"opacity":0.4,
});

$('#toolbar').show();

$(document.body).css({'margin':'0px'});
});


