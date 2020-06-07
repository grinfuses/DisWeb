$( "#calculadora" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#calculadora :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  console.log(data);
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/convertirEuros/" +data.origen+"/"+data.cantidad;
    $.ajax({
      url: url_get,
      type: 'post',
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
       var col = [];
       for (var i = 0; i < data.length; i++) {
           for (var key in data[i]) {
               console.log(key);
               if (col.indexOf(key) === -1) {
                   //console.log(key);
                   if(key=="cantidad" || key=="divisaOrigen" || key =="divisaDestino" || key=="conversion"){
                       console.log("prueba");
                        col.push(key);
                    }
               }
           }
       }
               // CREATE DYNAMIC TABLE.
               var table = document.createElement("table");
                console.log(col);
               // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
       
               var tr = table.insertRow(-1);                   // TABLE ROW.

               for (var i = 0; i < col.length; i++) {
                   var th = document.createElement("th");      // TABLE HEADER.
                   th.innerHTML = col[i];
                   tr.appendChild(th);
               }
               var space="";
               // ADD JSON DATA TO THE TABLE AS ROWS.
               for (var i = 0; i < data.length; i++) {
       
                   tr = table.insertRow(-1);
       
                   for (var j = 0; j < col.length; j++) {
                       var tabCell = tr.insertCell(-1);
                       var data_input = data[i][col[j]];
                       
                       if(data_input ==null){
                        tabCell.innerHTML = space;
                       }
                       }
                   }
               
       
               // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
               var cantidad = data.cantidad;
               var divisaOrigen = data.divisaOrigen;
               var conversion = data.conversion;
               document.getElementById("encabezado").innerHTML="Conversion";
               document.getElementById("encabezadoOrigen").innerHTML="Moneda Origen";
               document.getElementById("monedaOrigen").innerHTML=divisaOrigen;
               document.getElementById("encabezadoCantidad").innerHTML="Cantidad a convertir";
               document.getElementById("monedaCantidad").innerHTML=cantidad;
               document.getElementById("encabezadoConvertida").innerHTML="Cantidad en euros";
               document.getElementById("monedaConvertida").innerHTML=conversion;
      }
});
    
  });