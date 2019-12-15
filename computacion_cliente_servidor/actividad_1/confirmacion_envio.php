<!DOCTYPE html>
<!--
    Created on : 02-dic-2019
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Confirmación</title>
        <link type="text/css" rel="stylesheet" href="../style.css">
        <?php
        $nombre = $_POST['username'];
        $telephone = $_POST['telephone'];
        $time = $_POST['time'];
        $gender = $_POST['gender'];
        $coche = $_POST['coche'];
        ?>
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la confirmación  de la actividad 1 </h1>
        </header>
        <section class="principal">
        <strong> Sus datos han sido enviados correctamente </strong>
        <?php echo"<br/> &nbsp; " . $nombre . " "; ?> 
        <?php echo"<br/> &nbsp; " . $telephone . " "; ?> 
        <?php echo"<br/> &nbsp; " . $time . " "; ?> 
        <?php echo"<br/> &nbsp; " . $gender . " "; ?> 
        <?php echo"<br/> &nbsp; " . $coche . " "; ?> 
</section>
    </body>
</html>
