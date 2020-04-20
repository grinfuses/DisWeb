<?php 
require("includes/conexion.php");

if(isset($_GET['accion']) && $_GET['accion']=="anyadir"){ 
    $id=intval($_GET['id']); 
    if(isset($_SESSION['carrito'][$id])){ 
        $_SESSION['carrito'][$id]['cantidad']++; 
    }else{ 
        $sql_s="SELECT * FROM comidas WHERE codigoComida=$id"; 
        $query_s=mysqli_query($conexion, $sql_s); 
        if(mysqli_num_rows($query_s)!=0){ 
            $fila_s=mysqli_fetch_array($query_s); 

            $_SESSION['carrito'][$fila_s['codigoComida']]=array( 
                    "cantidad" => 1, 
                    "precio" => $fila_s['precioComida']);
        }
    }
} 
  
?> 
<h1>Lista de Comidas</h1>

<table> 
    <tr> 
        <th>Comida</th> 
        <th>Descripción</th> 
        <th>Precio</th> 
        <th>Acción</th> 
    </tr> 

    <?php 

        $sql="SELECT * FROM comidas ORDER BY nombreComida ASC"; 
        $query=mysqli_query($conexion, $sql); 

        while ($fila=mysqli_fetch_array($query)) { 
    ?> 
        <tr> 
            <td><?php echo $fila['nombreComida'] ?></td> 
            <td><?php echo $fila['descripcionComida'] ?></td> 
            <td class="numero"><?php echo $fila['precioComida'] ?> €</td> 
            <td><a href="index.php?pagina=comidas&accion=anyadir&id=<?php echo $fila['codigoComida'] ?>">Añadir al carrito</a></td> 
        </tr> 
    <?php } ?> 
</table>
<br>
<a href="index.php?pagina=carrito">Ir al carrito</a>