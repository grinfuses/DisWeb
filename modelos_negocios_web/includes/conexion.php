<?php 
  
  $server="localhost"; 
  $user="root"; 
  $pass=""; 
  $db="bdcomidas"; 
    
  // connect to mysql 
    
  $conexion = mysqli_connect($server, $user, $pass) or die("Lo siento, no se puede conectar al servidor."); 
  $acentos = $conexion->query("SET NAMES 'UTF8'");
    
  // select the db 
    
  mysqli_select_db($conexion, $db) or die("Lo siento, no se puede conectar  a la base de datos."); 

?>