<?PHP
    include "conn.php";

    $banner= $conn->query("SELECT * FROM market");

    $arr1 = array();

    for($i=0;$i<$banner->num_rows;$i++){
        $arr1[$i] = $banner->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }

    echo json_encode($arr1);