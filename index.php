<?php
$html  = '';

$extdir="external/";
$extJSDir=$extdir."js/";
$extCSSDir=$extdir."css/";

$jsDir="js/";
$cssDir="css/";


/**
 *    Keep in Mind the Order of things might be of importance 
 **/

$extCSS=array(
		'eggplant/jquery-ui-1.8.23.custom',
	);

$intCSS=array(

	);

$extJS=array(
		'jquery-1.8.2',
		'jquery-ui-1.8.23.custom.min',
		'tquery-bundle-require',
		'THREEx.KeyboardState',
		'ColladaLoader',
	);

$intJS= array(
		'gui',
		'key',
		'cam',
		'main',
);

/**
 *  Dont touch stuff below this line :) pretty please ~ tut sowieso keiner -_- den Satz haett ich mir sparen koennen ~ inbre
 **/ 

$html .= '<html>';
$html .= '<head/>';

/*
 *  Abgelenkt ah...ja so nennt man das also heute :-p 
 */ 
foreach ($extCSS as $cssFileName){
	$html .= '<link type="text/css" href="'.$extCSSDir.$cssFileName.'.css" rel="stylesheet" />'."\n";
}
foreach ($intCSS as $cssFileName){
	$html .= '<link type="text/css" href="'.$cssDir.$cssFileName.'.css" rel="stylesheet" />'."\n";
}
foreach ($extJS as $jsFileName){
	$html .= '<script src="'.$extJSDir.$jsFileName.'.js" ></script>'."\n";
}
foreach ($intJS as $jsFileName){
	$html .= '<script src="'.$jsDir.$jsFileName.'.js" ></script>'."\n";
}

$html .= '<body>';

/*
 * TODO:  P.O: - Raem doch endlich mla dein Zimmer auf aber zack zack ... das ist ja die hoelle in farbe und 3D  ~ inbre
 */

$html .= '
<style>
	#toolbar { padding: 15px 6px; }
</style>
<div class="demo">
	<span style="position:fixed;top:50px;px;z-index:100;opacity:0.4;" id="toolbar" class="ui-widget-header ui-corner-all">
		<!--button id="beginning">go to beginning</button>
		<button id="rewind">rewind</button>
		<button id="play">play</button>
		<button id="stop">stop</button>
		<button id="forward">fast forward</button>
		<button id="end">go to end</button-->
		<input type="checkbox" id="shuffle" /><label for="shuffle">Shuffle</label>
		<span id="repeat">
			<input type="radio" id="slot0" name="repeat" checked="checked" /><label for="slot0">primary</label>
			<input type="radio" id="slot1" name="repeat" /><label for="slot1">secondary</label>
			<input type="radio" id="slot2" name="repeat" /><label for="slot2">terrtiary</label>
			<input type="radio" id="slot3" name="repeat" /><label for="slot3">extra1</label>
			<input type="radio" id="slot4" name="repeat" /><label for="slot4">extra2</label>
		</span>

	</span>
</div>
';

$html .= '</body>';
$html .= '</html>';
echo $html;
