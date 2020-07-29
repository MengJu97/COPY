<?php
include "conn.php";

if(isset($_POST['phone']) && isset($_POST['password'])){
        $phone = $_POST['phone'];
        $password = sha1($_POST['password']);
        $result = $conn->query("select * from usertable where phone = '$phone' and password='$password'");
        if($result->fetch_assoc()){
            echo 1;
//             header('location:http://localhost/PerfectWord/src/home.html');
        }else{
            echo 0;
        }
    }