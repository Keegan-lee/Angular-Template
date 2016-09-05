<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

$directories = "../../img/blog/travel/";

echo json_encode(dirToArray($directories));

function dirToArray($dir) { 

	$result = array(); 

	$cdir = scandir($dir); 

	foreach ($cdir as $key => $value) 
	{ 
		if (!in_array($value,array(".",".."))) 
		{ 
			if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) { 
				$result[$value] = dirToArray($dir . $value); 
			} 
			else { 
				$result[] = $dir.DIRECTORY_SEPARATOR.$value;
			}   
		}
	} 
	return $result;
}
?>