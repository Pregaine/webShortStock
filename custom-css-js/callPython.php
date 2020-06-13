<?php

function runCommand($cmd, &$retval) {
	syslog(LOG_WARNING, $cmd);
	$retval = array();
	exec($cmd, $retval);
	$log = implode("\n", $retval);
	syslog(LOG_WARNING, $log);
	return $log;
}

# echo( runCommand( "env", $retval ) );

// echo $num . 'test';

function callpy() {

	$num = $_POST[ "input_Value" ];

	// if( !$num )
	// 	$num = 2330;
	
	$jsondata = exec( "LANG=en_US.UTF-8 PYTHONIOENCODING=utf-8 /home/pi/miniconda3/envs/py36/bin/python /home/pi/Downloads/CalRevenue.py '". $num . "'", $output );
	
	// var_dump( $jsondata );

	echo $jsondata;
}

try{
	
	callpy( );

	// $jsondata = callpy( );	
	
	// $obj = json_decode( $jsondata, True );
	
	// var_dump( $obj );
	
	// var_dump( $obj[ 0 ] );
	
	// print_r( $obj[ 0 ] );
	
	// print_r( $obj[ 1 ] );
	
	// print_r( $obj[ 2 ] );
	
	// echo "<table>";
	
	// echo '<tr>';
	
	// echo "<td>股名</td>";
	// echo "<td>股號</td>";
	// echo "<td>觀察日</td>";
	// echo "<td>買進日</td>";
	// echo "<td>買進價</td>";	
	// echo "<td>賣出日</td>";
	// echo "<td>賣出價</td>";
	// echo "<td>損益</td>";
	
	// echo '</tr>';
	
	// foreach ( $obj as $theCurrentRow ) {
		
	// 	echo '<tr>';
		
	// 	echo "<td>" . $theCurrentRow[ "股名" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "股號" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "觀察日" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "買進日" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "買進價" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "賣出日" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "賣出價" ] . "</td>";
	// 	echo "<td>" . $theCurrentRow[ "損益" ] . "</td>";
		
	// 	echo '</tr>';
	// }
	
	// echo "</table>";
}
 
catch( Exception $e ){
	
    echo 'Caught exception: ' . $e->getMessage() . "\n";
}

?>