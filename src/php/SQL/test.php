 <?php 
 	//echo json_encode("{'success': true}");
	$link = mysqli_connect('keeganleeca.fatcowmysql.com', 'keegan_lee', 'P14n0M4n', "keegan_lee"); 

	if (!$link) {
    	echo json_encode("Error: Unable to connect to MySQL." . PHP_EOL);
    	echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    	echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    	exit;
	} else {
		echo json_encode("{'success': true}");
	}
?>