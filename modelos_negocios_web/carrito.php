<?php
    if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 

    if(isset($_POST['enviar'])){ 
          
        foreach($_POST['cantidad'] as $key => $val) { 
            if($val==0) { 
                unset($_SESSION['carrito'][$key]); 
            }else{ 
                $_SESSION['carrito'][$key]['cantidad']=$val; 
            } 
        }     
    } 
?> 
  
<h1>Carrito de comidas</h1> 

<form method="post" action="index.php?pagina=carrito"> 
      
    <table>
        <tr> 
            <th>Comida</th> 
            <th>Cantidad</th> 
            <th>Precio</th> 
            <th>Subtotal</th> 
        </tr> 
          
        <?php 
          require("includes/conexion.php");
            $sql="SELECT * FROM comidas WHERE codigoComida IN ("; 
                      
                foreach($_SESSION['carrito'] as $id => $value) { 
                    $sql.=$id.","; 
                } 

                $sql=substr($sql, 0, -1).") ORDER BY nombreComida ASC"; 
                $query=mysqli_query($conexion, $sql); 
                $total=0; 
                while($fila=mysqli_fetch_array($query)){ 
                    $subtotal=$_SESSION['carrito'][$fila['codigoComida']]['cantidad']*$fila['precioComida']; 
                    $total+=$subtotal; 
                ?> 
                    <tr> 
                        <td><?php echo $fila['nombreComida'] ?></td> 
                        <td><input type="text" class="numero" name="cantidad[<?php echo $fila['codigoComida'] ?>]" size="8" value="<?php echo $_SESSION['carrito'][$fila['codigoComida']]['cantidad'] ?>" /></td> 
                        <td class="numero"><?php echo $fila['precioComida'] ?> €</td> 
                        <td class="numero"><?php echo number_format($_SESSION['carrito'][$fila['codigoComida']]
                        ['cantidad']*$fila['precioComida'], 2, '.', '') ?> €</td> 
                    </tr> 
                <?php } ?> 
                <tr> 
                    <td colspan="4">Total: <?php echo number_format($total, 2, '.', '') ?> €</td> 
                </tr> 
    </table> 
    <br /> 
    <button type="submit" name="enviar">Actualizar carrito</button> 
</form> 
<br /> 
<p>Para quitar una comida, pon 0 en cantidad</p>
<a href="index.php?pagina=comidas">Ir a las comidas</a>