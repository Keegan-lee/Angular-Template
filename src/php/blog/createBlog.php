<?php
	ini_set('display_errors', 'On');

	$blogPostsPath = "../../js/JSON/blog/newBlog";

	// echo json_encode("{'success' : true,
	// 						'message' : 'Blog Created Successfully',
	// 						'blogName' : '" + $ret['blogName'] + "'}");

	// echo json_encode("{'success' : false, 'message' : 'Blog could not be created'}");

	$count = "";

	while (is_dir($blogPostsPath.$count)) {
		if ($count == "") {
			$count = 1;
		} else {
			$count += 1;
			if ($count == 10) {
				echo json_encode("{'success': false}");
				return;
			}
		}
	}

	if(($ret = mkdir($blogPostsPath.$count.'/', '0755', true))) {

		echo json_encode("{'success': true, 'ret': $ret}");

		// return {
		// 	'success' : true,
		// 	'blogName' : 'newBlog' + $count
		// };
	}
?>