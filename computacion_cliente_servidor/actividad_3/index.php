<!DOCTYPE html>
<!--
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Actividad 3</title>
        <link type="text/css" rel="stylesheet" href="style.css">
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la actividad 3 </h1>
        </header>
        <section class="principal">
            <h3>Nuevo usuario</h3>
            <form method="post" action="confirmacion_envio.php">  
                <label for="name">Nombre de usuario:</label>
                <input id="username" name="username" placeholder="Nombre de usuario">
                <label for="password">Contraseña:</label>
                <input id="password" name="password" placeholder="Contraseña">
                <input id="rep_password" name="rep_password" placeholder="Contraseña" onblur="validatePassword()">
                <input id="submit" name="submit" type="submit" value="Enviar" onmouseover="style.color='red'" onmouseout="style.color='black'">
            </form>
        </section>
     <script src="scripts.js"></script>
    </body>
</html>
