<?PHP
    include "conn.php";

    $banner= $conn->query("SELECT * FROM banner");

    $arr1 = array();

    for($i=0;$i<$banner->num_rows;$i++){
        $arr1[$i] = $banner->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }

    //首页图片
    $home= $conn->query("SELECT * FROM perfect");

    $arr2 = array();

    for($i=0;$i<$home->num_rows;$i++){
            $arr2[$i] = $home->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }


    class data{};

    $d = new Data();

    $d->banner = $arr1;
    $d->home = $arr2;

    echo json_encode($d);