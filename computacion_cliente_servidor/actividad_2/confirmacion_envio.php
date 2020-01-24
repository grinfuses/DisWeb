<!DOCTYPE html>
<!--
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Confirmación</title>
        <link type="text/css" rel="stylesheet" href="style.css">
        <?php
        $name = $_POST['name'];
        $telephone = $_POST['telephone'];
        $email = $_POST['email'];
        $gender = $_POST['gender'];
        $car_type = $_POST['car_type'];
        $error_gender=false;
        $error_email=false;
        if( empty($_POST['gender']) ) 
        { 
          echo'<script type="text/javascript">
                  alert("No ha seleccionado ningún género, complételo");
                  window.location.href="index.php";
                  </script>';
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo'<script type="text/javascript">
                  alert("Error en el formulario, revise email , complete el formulario");
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
            <label for="name">Nombre:</label>
            <?php echo"<br/> &nbsp; " . $name . " </p>"; ?> 
            <label for="telephone">Teléfono:</label>
            <?php echo"<br/> &nbsp; " . $telephone . "</p> "; ?>
            <label for="email">Correo electrónico:</label>
            <?php echo"<br/> &nbsp; " . $email . "</p> "; ?> 
            <label for="gender">Género:</label>
            <?php echo"<br/> &nbsp; " . $gender . "</p> "; ?> 
            <label for="car">Coche favorito:</label>
            <?php echo"<br/> &nbsp; " . $car_type . "</p> "; ?> 
        </section>
    </body>
</html>

<!--
Este es un formulario básico donde se ha capturado una serie de datos, posteriormente se ha enviado
por Post usando el script de confirmacion_envio.php, al capturar los datos enviados por index.php se 
ha usado la función filter para validar el correo eléctronico proporcionado. En caso de error porque el 
correo no sea correcto, se envía de nuevo al usuario a index.php y si es apropiado, se muestra lo enviado
-->