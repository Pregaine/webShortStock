<?php

function runCommand($cmd, &$retval) {
	syslog(LOG_WARNING, $cmd);
	$retval = array();
	exec($cmd, $retval);
	$log = implode("\n", $retval);
	syslog(LOG_WARNING, $log);
	return $log;
}

// echo( runCommand( "env", $retval ) );

// echo $num . 'test';

function callpy() {

	$num = $_POST[ "input_Value" ];

	if( !$num ){
           $num = 2330;
	}
	else {
	   // echo $num . 'test'
	}

	$jsondata = exec( "LANG=en_US.UTF-8 PYTHONIOENCODING=utf-8 /home/pi/miniconda3/envs/py36/bin/python /home/pi/Downloads/CalRevenue.py '". $num . "'", $output );
	
	// var_dump( $jsondata );

	echo $jsondata;
}

try{
	
    callpy( );
}
 
catch( Exception $e ){
	
    echo 'Caught exception: ' . $e->getMessage() . "\n";
}

?>
