<?php
header("Content-Type:application/json");
require_once("init.php");
@$q=$_REQUEST["q"];
@$f=$_REQUEST["f"];
@$order=$_REQUEST["order"];
@$minPrice=$_REQUEST["minPrice"];
@$maxPrice=$_REQUEST["maxPrice"];
//按radio中选中的条件
@$sex=$_REQUEST["sex"];
@$engine=$_REQUEST["engine"];
@$size=$_REQUEST["size"];
@$shape=$_REQUEST["shape"];
@$diamond=$_REQUEST["diamond"];
@$color=$_REQUEST["color"];
@$mater=$_REQUEST["mater"];
@$band=$_REQUEST["band"];
@$deep=$_REQUEST["deep"];

// $sql="select *,(select sm from lq_watch_pic where wid=lq_watch.wid limit 1)as sm from lq_watch where 1=1";
$sql="select a.*,sm,dp1 from lq_watch a left join lq_watch_pic b on a.title=b.title where 1=1 ";
if ($q){
  $sql.=" and a.title like '%$q%'";
}
if ($f){
  $sql.=" and a.wname like '%$f%'";
}
if($minPrice || $maxPrice){
  $sql.=" and price between $minPrice and $maxPrice ";
}
if($sex!==null || $sex !==""){
  if($sex=="1"){
      $sql.=" and substring(a.title,4,1) between 1 and 4 ";
  }else if($sex=="0"){
      $sql.=" and substring(a.title,4,1) between 6 and 9 ";
  }
}
if($engine){
  if($engine=="auto"){
      $sql.=" and engine like '%自动%' ";
  }
}
if($size){
  if($size=="30"){
     $sql.=" and size < $size ";
  }else {
     $sql.=" and size between 30 and 40 ";
  }
}
if($shape){
  $sql.=" and shape like '%圆形%' ";
}
if($diamond){
  $sql.=" and diamond != '' ";
}
if($color){
  if($color=="black"){
      $sql.=" and color like '%黑色%' ";
  }else if($color=="silvery"){
      $sql.=" and color like '%银色%' ";
  }
}
if($mater){
  $sql.=" and mater like '%精钢%' ";
}
if($band){
  if($band=="metal"){
      $sql.=" and right(a.title,1)>3 ";
  }else {
      $sql.=" and right(a.title,1) between 1 and 2 ";
  }
}
if($deep){
 $sql.=" and deep like '%5巴%' ";
}
if($order!==null || $order!==""){
	switch ($order) {
		case '0':
			$sql.=" order by wid";
			break;
		case '1':
			$sql.=" order by price";
			break;
		case '2':
			$sql.=" order by price desc";
			break;
		case '3':
			$sql.=" order by seq_top_sale desc";
			break;
		case '4':
			$sql.=" order by seq_new_arrival desc";
			break;			
		default:
			$sql.=" order by wid";
			break;
	}
}

$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
echo json_encode($data);