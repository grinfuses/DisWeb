<!DOCTYPE html>
<!--
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Confirmació de envío</title>
        <link type="text/css" rel="stylesheet" href="style.css">
        <?php
        $username = $_POST['username'];
        $pass = $_POST['password'];
        define('DB_SERVER', '');
define('DB_USERNAME', '');
define('DB_PASSWORD', '');
define('DB_NAME', 'unir');
 
/* Attempt to connect to MySQL database */
$link = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
        $query = "SELECT * FROM users WHERE username = '$username'";
        $result = mysqli_query($link, $query);
        if (mysqli_num_rows($result) == 1) {
           header('Location: index.php');
            //avisar que hay un y existe el user
        } else {

            $query = "INSERT INTO users(username, password) VALUES ('$username', MD5('$pass'))";
            $result = mysqli_query($link, $query);
            if ($result == 1) {
                $name = $username;
            } else {
                header('Location: index.php');
                //avisar que hay un error
            }
        }
        ?>
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la confirmación  de la actividad 3 </h1>
        </header>
        <section class="principal">
            <strong> Se ha añadido un nuevo usuario </strong>
            <label for="name">Nombre:</label>
            <?php echo"<br/> &nbsp; " . $name . " </p>"; ?> 
            Volver al  <a href="../dashboard.php"> Dashboard </a>
        </section>
    </body>
</html>

<!--
Este es un formulario básico donde se ha capturado una serie de datos, posteriormente se ha enviado
por Post usando el script de confirmacion_envio.php, al capturar los datos enviados por index.php se 
ha usado la función filter para validar el correo eléctronico proporcionado. En caso de error porque el 
correo no sea correcto, se envía de nuevo al usuario a index.php y si es apropiado, se muestra lo enviado
-->