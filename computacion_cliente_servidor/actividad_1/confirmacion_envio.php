<!DOCTYPE html>
<html>
<html lang="es" xml:lang="es" xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="UTF-8">
        <title>Confirmación</title>
        <link type="text/css" rel="stylesheet" href="style.css">
        <?php
        $nombre = $_POST['username'];
        $telephone = $_POST['telephone'];
        $correo_electronico = $_POST['correo_electronico'];
        $gender = $_POST['gender'];
        $coche = $_POST['coche'];
        if (!filter_var($correo_electronico, FILTER_VALIDATE_EMAIL)) {
            echo'<script type="text/javascript">
                  alert("Correo electrónico erróneo, revise");
                  window.location.href="index.php";
                  </script>';
        }
        ?>
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la confirmación  de la actividad 1 </h1>
        </header>
        <section class="principal">
            <strong> Sus datos han sido enviados correctamente </strong>
            <label for="nombre">Nombre:</label>
            <?php echo"<br/> &nbsp; " . $nombre . " </p>"; ?> 
            <label for="telephone">Teléfono:</label>
            <?php echo"<br/> &nbsp; " . $telephone . "</p> "; ?>
            <label for="hour">Correo electrónico:</label>
            <?php echo"<br/> &nbsp; " . $correo_electronico . "</p> "; ?> 
            <label for="gender">Género:</label>
            <?php echo"<br/> &nbsp; " . $gender . "</p> "; ?> 
            <label for="car">Coche favorito:</label>
            <?php echo"<br/> &nbsp; " . $coche . "</p> "; ?> 
        </section>
    </body>
</html>

<!--
Este es un formulario básico donde se ha capturado una serie de datos, posteriormente se ha enviado
por Post usando el script de confirmacion_envio.php, al capturar los datos enviados por index.php se 
ha usado la función filter para validar el correo eléctronico proporcionado. En caso de error porque el 
correo no sea correcto, se envía de nuevo al usuario a index.php y si es apropiado, se muestra lo enviado
-->