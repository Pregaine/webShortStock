<?php
    
    $errMsg="";
    $num = $_POST["input_Value"];

    try {
        
        if( !$num )
            $num = '2317';
        
	// 取得 到此目錄前的完整 PATH, 不含檔名
	require_once( dirname(__FILE__) . "/connectDB.php" );
        
        // --  DATE_FORMAT( date, '%y/%m/%d' ), 

        $queryCmdTest = "SELECT 
                         UNIX_TIMESTAMP( date ) * 1000,
                         open_price,                         
			             high_price,
                         low_price,
                         close_price
                         FROM TECH_M WHERE stock = '". $num . "' ORDER BY date DESC LIMIT 100;";

        // $stmt = $conn->prepare( $queryCmdTest );
        // $stmt->execute( );
	
        // set the resulting array to associative
        // $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $bgdata = $conn->query( $queryCmdTest );
        
        $array = $bgdata->fetchall( PDO::FETCH_NUM );
        
        echo json_encode( $array, JSON_NUMERIC_CHECK );

    } 
    catch ( PDOException $e ) {
        
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        echo $errMsg;
    }

?>
