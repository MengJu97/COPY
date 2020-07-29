<?php
include "conn.php";

// echo true;
if(isset($_GET['phone'])){
    $phone = $_GET['phone'];
    //检查手机号是否已经被注册了
    $result = $conn->query("select * from usertable WHERE phone = '$phone'");
    if($result->fetch_assoc()){
        echo false;
    }else{
        echo true;
    }
}
if(isset($_POST['submit'])){
//  echo true;
$phone = $_POST['phone'];
$password = sha1($_POST['password']);
$repeat = sha1($_POST['repeat']);
$conn->query("insert usertable values(null,'$phone','$password','$repeat')");
header('location:http://localhost/PerfectWord/src/login.html');
}
