$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

$("#biblioteca").ready(function( event ) {
    $.ajax({
        url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/getLatestBlockData",
        type: 'get',
        timeout: 10000, 
        dataType: 'json',        
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Error al buscar los datos de monedas, reinténtelo más tarde');
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
          var hash_medio = hash.slice(0, hash.length/2);
          var hash_medio2 = hash.slice(hash.length/2,hash.length)
          console.log(hash_medio);
          console.log(hash_medio2);
          var string_salida = " <b>Ultimas datos del minado de los bitcoin</b> ";
          string_salida += "<p>Ultimo hash: "+hash_medio +"</p>";
          string_salida += ""+hash_medio2 +"</p>";
          string_salida += "<p>Height: "+heig+"</p>";
          string_salida += "<p>Weight: "+weight+"</p>";
          string_salida += "<p>Fee obtenido: "+fee+"</p>";
          string_salida += "<p>Tamaño del bloque: "+size+"</p>";
          string_salida += "<p>Bits del bloque: "+bits+"</p>";
          document.getElementById("datos_bloques").innerHTML = string_salida;

        }});
});




