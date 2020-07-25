<?PHP
    include "conn.php";

    $banner= $conn->query("SELECT * FROM banner");

    $arr1 = array();

    for($i=0;$i<$banner->num_rows;$i++){
        $arr1[$i] = $banner->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }

    //首页图片
    $home= $conn->query("SELECT * FROM perfect WHERE logo='false'");



    $arr2 = array();

    for($i=0;$i<$home->num_rows;$i++){
            $arr2[$i] = $home->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }


    //logo图片
    $logo = $conn->query("SELECT * FROM perfect WHERE logo='true'");
    $arr3 = array();
    $arr3[0] = $logo->fetch_assoc();

    //dota2专区
    $arr4 = array();
    $dota = $conn->query("SELECT * FROM perfect WHERE type='dota2'");
    for($i=0;$i<$dota->num_rows;$i++){
                $arr4[$i] = $dota->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
        }

    class data{};

    $d = new Data();

    $d->banner = $arr1;
    $d->home = $arr2;
    $d->logo = $arr3;
    $d->dota = $arr4;

    echo json_encode($d);