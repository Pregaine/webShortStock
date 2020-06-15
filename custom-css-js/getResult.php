<?php
    
    $errMsg="";

    $num = $_POST["input_Value"];

    // $num = '2330';

    // echo $num . '!';
    
    try {
		
        require_once( dirname(__FILE__) . "/connectDB.php" );
        
        // --  DATE_FORMAT( date, '%y/%m/%d' ), 

        $queryCmdTest = "SELECT 
                         UNIX_TIMESTAMP( date ) * 1000,
                         open_price,                         
			             high_price,
                         low_price,
                         close_price
                         FROM TECH_W WHERE stock = '". $num . "' ORDER BY date ASC;";

        // $stmt = $conn->prepare( $queryCmdTest );
        // $stmt->execute( );
	
        // set the resulting array to associative
        // $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $bgdata = $conn->query( $queryCmdTest );
        
        $array = $bgdata->fetchall( PDO::FETCH_NUM );
        
        // $result = array_column( $array, 'date', 'open_price', 'high_price', 'low_price', 'close_price' );

        // echo $array;

        echo json_encode( $array, JSON_NUMERIC_CHECK );

    } 
    catch ( PDOException $e ) {
        
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        echo $errMsg;
    }

?>
