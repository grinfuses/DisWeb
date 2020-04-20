<?php 
  
  $server="localhost"; 
  $user="user_tienda"; 
  $pass="60FvIz5bGq5azRSY"; 
  $db="tienda_online"; 
    
  // connect to mysql 
    
  $conexion = mysqli_connect($server, $user, $pass) or die("Lo siento, no se puede conectar al servidor."); 
  $acentos = $conexion->query("SET NAMES 'UTF8'");
    
  // select the db 
    
  mysqli_select_db($conexion, $db) or die("Lo siento, no se puede conectar  a la base de datos."); 

?>