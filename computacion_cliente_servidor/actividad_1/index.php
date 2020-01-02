<!DOCTYPE html>
<!--
    Author     : jnaranjo
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Actividad 1</title>
        <link type="text/css" rel="stylesheet" href="style.css">
    </head>
    <body>
        <header class="principal">
            <h1>Bienvenido a la actividad 1 </h1>
        </header>
        <section class="principal">
            <h3>Formulario de contacto</h3>
            <form method="post" action="confirmacion_envio.php">  
                <label for="name">Nombre de contacto:</label>
                <input id="name" name="name" placeholder="Nombre">
                <label for="gender">Género:</label>
                <input type="checkbox" name="gender" value="hombre"> Hombre<br>
                <input type="checkbox" name="gender" value="mujer"> Mujer<br>
                <input type="checkbox" name="gender" value="otro"> Otro<br>
                <label for="telephone">Número de teléfono:</label>
                <input name="telephone" type="tel"placeholder="Teléfono">
                <label for="email">Correo electrónico:</label>
                <input name="email" type="mail" placeholder="Correo electrónico">
                <label>Vehículo favorito</label>
                <input list="car_type" name="car_type" />
                <datalist id="car_type">
                    <option label="Volvo" value="Volvo">
                    <option label="BMW" value="BMW">
                    <option label="Mercedes" value="Mercedes">
                </datalist>
                <input id="submit" name="submit" type="submit" value="Acceder">
            </form>
        </section>
    </body>
</html>
