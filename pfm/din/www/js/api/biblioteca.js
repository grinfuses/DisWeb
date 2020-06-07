$("#biblioteca").ready(function( event ) {
    $.ajax({
        url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/getLatestBlockData",
        type: 'get',
        timeout: 5000, 
        dataType: 'json',        
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Error al buscar la conversión, reinténtelo más tarde');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
          console.log(data);
          var hash = data.hash;
          var heig = data.height;
          var fee = data.fee;
          var weight= data.weight;
          var size= data.size;
          var bits = data.bits;
          var string_salida = " Ultimas datos del minado de los bitcoin ";
          string_salida += "<p>Ultimo hash: "+hash +"</p>";
          string_salida += "<p>Height: "+heig+"</p>";
          string_salida += "<p>Weight: "+weight+"</p>";
          string_salida += "<p>Fee obtenido: "+fee+"</p>";
          string_salida += "<p>Tamaño del bloque: "+size+"</p>";
          string_salida += "<p>Bits del bloque: "+bits+"</p>";
          document.getElementById("datos_bloques").innerHTML = string_salida;

        }});
});




