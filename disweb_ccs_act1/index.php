<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Formulario de contacto</title>
        <link type="text/css" rel="stylesheet" href="style.css">
    </head>
    <body>
        <?php
        $nombre = $POST['nombre'];
        $email = $POST['email'];
        $mensaje = $POST['mensaje'];
        if ($POST['submit']) {
                echo 'El mensaje se ha enviado';
            } else {
                echo 'Falló el envio';
            }
        
        ?>
        <header class="principal">
            <h1>Formulario de atención al cliente</h1>
        </header>
        <section class="principal">
            <form method="post" action="index.php">  
                <label for="nombre">Nombre:</label>
                <input id="nombre" name="nombre" placeholder="Nombre completo">
                <label for="email">Email:</label>
                <input id="email" name="email" type="email" placeholder="ejemplo@email.com">
                <label for="tipo_mensaje">Género:</label>
                <input type="radio" name="gender" value="hombre" checked> Hombre<br>
                <input type="radio" name="gender" value="mujer"> Mujer<br>
                <input type="radio" name="gender" value="otro"> Otro	
                <label for="tipo_mensaje">Tipo de coche:</label>
                <select name="cars" size="4" multiple>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                    <option value="audi">Renault</option>
                    <option value="audi">Mercedes</option>
                    <option value="audi">Toyota</option>
                </select>
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" placeholder="Danos tu mensaje"></textarea>
                <input id="submit" name="submit" type="submit" value="Enviar">
            </form>
        </section>
    </body>
</html>
