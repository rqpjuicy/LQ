<?php
header("Content-Type:application/json");
require_once("init.php");
@$w1=$_REQUEST["w1"];
@$w2=$_REQUEST["w2"];
if(!$w1){
  echo json_encode([]);
  return;
}
$sql="select * ,(select sm from lq_watch_pic where title=lq_watch.title limit 1)as sm from lq_watch where 1=1 ";
if($w1){
   $sql.=" and wid=$w1 ";
}
if($w2){
   $sql.=" or wid=$w2 ";
}
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
echo json_encode($data);