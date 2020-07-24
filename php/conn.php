<?php

    header('content-type:text/html;charset=utf-8');
    header('Access-Control-Allow-Origin:*');//任意域名访问
    header('Access-Control-Allow-Method:POST,GET');//允许的请求方式

    define('HOST','127.0.0.1');//主机名
    define('USERNAME','root');//用户名
    define('PASSWORD','12345678');//密码
    define('DBNAME','mysql');//数据库的名称

    $conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

    if($conn->connect_error){
        die('数据库连接失败'.$conn->connect_error);
    }
