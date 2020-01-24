<!DOCTYPE html>
<!--
    Created on : 02-dic-2019
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Login de usuario</title>
        <link type="text/css" rel="stylesheet" href="style.css">
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a las respuesta de las actividades de la asignatura de Computación - Cliente Servidor </h1>
        </header>
        <section class="principal">
            <form method="post" action="login_scripts.php">  
                <label for="nombre">Datos de acceso:</label>
                <input id="username" name="username" placeholder="User">
                <input id="password" name="password" placeholder="Password">
                <input id="submit" name="submit" type="submit" value="Acceder">
            </form>
        </section>
    </body>
</html>
