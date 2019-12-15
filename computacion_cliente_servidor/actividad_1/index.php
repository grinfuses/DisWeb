<!DOCTYPE html>
<html>
<html lang="es" xml:lang="es" xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="UTF-8">
        <title>Actividad 1</title>
        <link type="text/css" rel="stylesheet" href="style.css">
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la respuesta de la actividad 1 </h1>
        </header>
        <section class="principal">
            <form method="post" action="confirmacion_envio.php">  
                <label for="nombre">Formulario de contacto:</label>
                <input id="username" name="username" placeholder="Nombre">
                <label for="nombre">Género:</label>
                <input type="radio" name="gender" value="male" checked> Male<br>
                <input type="radio" name="gender" value="female"> Female<br>
                <input type="radio" name="gender" value="other"> Other<br>
                <label for="nombre">Número de teléfono:</label>
                <input name="telephone" type="tel"placeholder="Teléfono">
                <label for="nombre">Correo electrónico:</label>
                <input name="correo_electronico" type="mail" placeholder="Correo electrónico">
                <label>Vehículo favorito</label>
                <input list="coche" name="coche" />
                <datalist id="coche">
                    <option label="Volvo" value="Volvo">
                    <option label="BMW" value="BMW">
                    <option label="Mercedes" value="Mercedes">
                </datalist>
                <input id="submit" name="submit" type="submit" value="Acceder">
            </form>
        </section>
    </body>
</html>