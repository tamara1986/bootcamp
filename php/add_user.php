<?php
	include 'functions.php';


	$user = (array) json_decode(key($_POST));
	
	echo json_encode(add_data('users', $user));	
?>