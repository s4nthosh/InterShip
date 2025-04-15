<?php 

$servername="localhost";
$username='root';
$password='';
$dbname='intership';

try{
    $conn = new PDO ("mysql:host=$servername;dbname=$dbname",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

}
catch(PDOException $e){
    die(json_encode(["error"=>"Database connection failed: " . $e->getMessage()]));
}