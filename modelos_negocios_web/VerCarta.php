<?php
// initializ shopping cart class
include 'La-carta.php';
$cart = new Cart;
$clave='87401456';
$merchantID='082108630';
$AcquirerBIN='0000554002';
$TerminalId='00000003';
$num_operacion= random_int(1, 150);
$importe=$cart->total()*100;
$tipoMoneda=978;
$cadena='2SHA2';
$url_ok='http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/modelos_negocios_web/OrdenExito.php';
$url_nok='http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/modelos_negocios_web/VerCarta.php';

//$cadenaAFirmar=$clave.$merchantID.$AcquirerBIN.$TerminalId.$num_operacion+$importe.$tipoMoneda.$cadena.$url_ok.$url_nok;
$cadenaAFirmar="87401456082108630000055400200000003{$num_operacion}{$importe}9782SHA2http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/modelos_negocios_web/OrdenExito.phphttp://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/modelos_negocios_web/VerCarta.php";
$firma= strtolower(hash('sha256', $cadenaAFirmar));
$signature_str = $clave.$merchantID .$AcquirerBIN .$TerminalId .$num_operacion .$importe .$tipoMoneda .'2SHA2' .$url_ok .$url_ok; 
$firma_2= hash('sha256', $signature_str);


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Tienda virtual</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
    .container{padding: 20px;}
    input[type="number"]{width: 20%;}
    </style>
    <script>
    function updateCartItem(obj,id){
        $.get("cartAction.php", {action:"updateCartItem", id:id, qty:obj.value}, function(data){
            if(data == 'ok'){
                location.reload();
            }else{
                alert('Cart update failed, please try again.');
            }
        });
    }
    </script>
    <script src="https://www.paypal.com/sdk/js?client-id=AfLVQ45Vt3Rt9mXGz0dE0Y5pUBXcJFzPfV8zJd2bQp3jvEN9S5GxMmAaAbJWkuwxbY7IJ81lcktrOWJh"></script>
    <script>
        paypal.Buttons(
                {style: {
              layout:  'horizontal',
              color:   'blue',
              shape:   'rect',
              label:   'pay'},
               createOrder: function(data, actions) {
                    return actions.order.create({
                        payer: {
                            name: {
                              given_name: "Javi",
                              surname: "Prueba"
                            },
                            email_address: "customer@example.com",
                        },
                        purchase_units: [
                        {
                            reference_id: "JNS12121",
                            description: "Descripcion de compra",
                            custom_id: "jns001",
                            amount: {
                                currency: "USD",
                                value: <?php echo $cart->total()?> ,
                            },
                        }
                    ]
                });
            },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Call your server to save the transaction
                 window.location.href = "OrdenExito.php"
            });
        }
}).render('#button_paypal');

        </script>
</head>
</head>
<body>
<div class="container">
<div class="panel panel-default">
<div class="panel-heading"> 

<ul class="nav nav-pills">
  <li role="presentation"><a href="index.php">Inicio</a></li>
  <li role="presentation" class="active"><a href="VerCarta.php">Ver Carta</a></li>
  <li role="presentation"><a href="Pagos.php">Pagos</a></li>
</ul>
</div>

<div class="panel-body">


    <h1>Carrito de compras</h1>
    <table class="table">
    <thead>
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Sub total</th>
            <th>&nbsp;</th>
        </tr>
    </thead>
    <tbody>
        <?php
        if($cart->total_items() > 0){
            //get cart items from session
            $cartItems = $cart->contents();
            foreach($cartItems as $item){
        ?>
        <tr>
            <td><?php echo $item["name"]; ?></td>
            <td><?php echo $item["price"].'USD'; ?></td>
            <td><input type="number" class="form-control text-center" value="<?php echo $item["qty"]; ?>" onchange="updateCartItem(this, '<?php echo $item["rowid"]; ?>')"></td>
            <td><?php echo $item["subtotal"].' USD'; ?></td>
            <td>
                <a href="AccionCarta.php?action=removeCartItem&id=<?php echo $item["rowid"]; ?>" class="btn btn-danger" onclick="return confirm('¿Desea eliminar?')"><i class="glyphicon glyphicon-trash"></i></a>
            </td>
        </tr>
        <?php } }else{ ?>
        <tr><td colspan="5"><p>Tu carta esta vacia.....</p></td>
        <?php } ?>
    </tbody>
    <tfoot>
        <tr>
            <td><a href="index.php" class="btn btn-warning"><i class="glyphicon glyphicon-menu-left"></i> Continue Comprando</a></td>
            <td colspan="2"></td>
            <?php if($cart->total_items() > 0){ ?>
            <td class="text-center"><strong>Total <?php echo $cart->total().' USD'; ?></strong></td>
            <td><a href="Pagos.php" class="btn btn-success btn-block">Pagos <i class="glyphicon glyphicon-menu-right"></i></a></td>
            <td><div id="button_paypal"></div></td>
            <td><form name="frm_customer_detail" action="https://tpv.ceca.es/tpvweb/tpv/compra.action" method="POST">     <INPUT NAME="MerchantID" TYPE=hidden VALUE="082108630">

<INPUT NAME="AcquirerBIN" TYPE=hidden VALUE="0000554002">
<INPUT NAME="TerminalID" TYPE=hidden VALUE="00000003">
<INPUT NAME="URL_OK" TYPE=hidden VALUE="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/modelos_negocios_web/OrdenExito.php">
<INPUT NAME="URL_NOK" TYPE=hidden VALUE="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/modelos_negocios_web/VerCarta.php">
<INPUT NAME="Firma" TYPE=hidden VALUE=<?php echo $firma;?>>
<INPUT NAME="Cifrado" TYPE=hidden VALUE="SHA2">
<INPUT NAME="Num_operacion" TYPE=hidden VALUE=<?php echo $num_operacion;?>>
<INPUT NAME="Importe" TYPE=hidden VALUE=<?php echo $importe; ?>>
<INPUT NAME="TipoMoneda" TYPE=hidden VALUE="978">
<INPUT NAME="Exponente" TYPE=hidden VALUE="2">
<INPUT NAME="Pago_soportado" TYPE=hidden VALUE="SSL">
<INPUT NAME="Idioma" TYPE=hidden VALUE="1">

    <div>

        <input type="submit" class="btn btn-success" value="Pagar con tarjeta de crédito">

    </div>

    </form>

            </td>
            <?php } ?>
        </tr>
    </tfoot>
    </table>
    
    </div>
 <div class="panel-footer">Javier Naranjo Sanjuan</div>
 </div>
 
</div>
</body>
</html>