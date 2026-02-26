<?php
if(isset($_POST['scoreCount'])){
    $score=$_POST['scoreCount'];

    $conx=mysqli_connect("localhost","root","","demo");
    $sql="INSERT INTO `Resultdb` (`scoreCount`) VALUES ('$score');";
    $result=mysqli_query($conx,$sql);

    if($result==true){
        echo "<h4>Result is added to database!</h4>"
    }
}
?>