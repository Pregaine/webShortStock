<?php

    	// $conn = new PDO( "mysql:host=$servername;dbname=$dbname", $username, $password);
    	// $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$dsn = "mysql:host=localhost;port=3306;dbname=mysql;charset=utf8";
        $user = "root";
        $password = "RF69xy7C";
        $options = array(PDO::ATTR_CASE => PDO::CASE_NATURAL, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
        $conn = new PDO($dsn, $user, $password, $options);
        
	$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

	// echo "<br>連線成功~";

?>
