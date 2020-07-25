<?php
 include "conn.php";

 $sid = $_GET['sid'];


 $result= $conn->query("SELECT * FROM market WHERE sid = '$sid'");

 $arr = array();

 $arr[0] = $result->fetch_assoc();
 echo json_encode($arr);
