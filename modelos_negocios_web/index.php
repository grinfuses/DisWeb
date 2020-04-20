<?php 
    session_start(); 
    require("includes/conexion.php"); 
    if(isset($_GET['pagina'])){      
        $paginas=array("comidas", "carrito");      
        if(in_array($_GET['pagina'], $paginas)) {         
            $_pagina=$_GET['pagina'];           
        }else{            
            $_pagina="comidas";             
        }          
    }else{         
        $_pagina="comidas";  
    } 
?>

<!DOCTYPE html> 
<html lang="es">
<meta charset="UTF-8">  
 
<head> 
    <link rel="stylesheet" href="css/estilos.css" />  
    <title>Carrito de comidas</title> 
</head> 
  
<body> 
      
    <div id="container"> 
        <div id="main"> 
             <?php require($_pagina.".php"); ?>
        </div>
    </div>

</body> 
</html>