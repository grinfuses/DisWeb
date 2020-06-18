$("#calculadora").ready(function( event ) {
    var nombre_usuario = window.localStorage.getItem('userName');
    document.getElementById("nombre_usuario").innerHTML = "<b>" + nombre_usuario + "</b>";
});
$( "#calculadora" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#calculadora :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  if(data.cantidad ==""){
      alert("Cantidad vacía, por favor rellene");
  }else{
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/convertirEuros/" +data.origen+"/"+data.cantidad;
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 5000, 
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al convertir el valor, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data,) {
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
               document.getElementById("encabezado_calculadora_registrado").innerHTML="<b>Conversion de divisas</b>";
               document.getElementById("encabezadoOrigen").innerHTML="<b>Divisa Origen</b>: "+divisaOrigen;
               //document.getElementById("monedaOrigen").innerHTML=divisaOrigen;
               document.getElementById("encabezadoCantidad").innerHTML="<b>Cantidad convertida</b>: "+cantidad;
               //document.getElementById("monedaCantidad").innerHTML=cantidad;
               document.getElementById("encabezadoConvertida").innerHTML="<b>Valor en euros</b>";
               document.getElementById("monedaConvertida").innerHTML=test(conversion)+ " €";
      }
});}
    
  });

  function test (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9
  
    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2)+ " B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6
  
    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3
  
    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"
  
    : (Math.abs(Number(labelValue))).toFixed(2);
  
  }
  