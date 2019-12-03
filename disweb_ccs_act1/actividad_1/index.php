<!DOCTYPE html>
<!--
    Created on : 02-dic-2019
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Actividad 1</title>
        <link type="text/css" rel="stylesheet" href="../style.css">
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la respuesta de la actividad 1 </h1>
        </header>
        <section class="principal">
            <form method="post" action="actividad_1_scripts.php">  
                <label for="nombre">Formulario de contacto:</label>
                <input id="nombre" name="text" placeholder="User">
                <input id="password" name="password" placeholder="Password">
                <label for="nombre">Género:</label>
                <input type="radio" name="gender" value="male" checked> Male<br>
                <input type="radio" name="gender" value="female"> Female<br>
                <input type="radio" name="gender" value="other"> Other    <input type="submit" value="" />
                <label for="nombre">Número de teléfono:</label>
                <input type="tel">
                <label for="nombre">Hora:</label>
                <input type="time">
                <input id="submit" name="submit" type="submit" value="Acceder">
            </form>
        </section>
    </body>
</html>
