<?php
$html  = '';


/*
 *  Might change ... just do it 
 */

$extJSDir="external/js/";
$jsDir="js/";


/**
 *    Keep in Mind the Order of things might be of importance 
 **/

$extJS=array(
		'jquery-1.8.2',
		'tquery-bundle-require',
		'THREEx.KeyboardState',
		'ColladaLoader',
	);

$intJS= array(
		'key',
		'cam',
		'main',
);


/**
 *  Dont touch stuff below this line :) pretty please 
 **/ 

$html .= '<html>';
$html .= '<head>';
$html .= '<body>';
$html .= '</body>';

foreach ($extJS as $jsFileName)
{
	$html .= '<script ';
	$html .= 'src="';
	$html .= $extJSDir.$jsFileName.".js";
	$html .= '"';
	$html .= ' ></script>'."\n";
}

foreach ($intJS as $jsFileName)
{
	$html .= '<script ';
	$html .= 'src="';
	$html .= $jsDir.$jsFileName.".js";
	//$html .= "all.js";
	$html .= '"';
	$html .= ' ></script>'."\n";
}

$html .= '</html>';

echo $html;
