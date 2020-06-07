$( "#ver_cartera" ).ready(function( event ) {
    var data_sender={};
    var index_elementos=0;
    var username = window.localStorage.getItem('usernameLogin');
    var token = window.localStorage.getItem('userToken');
    data_sender["username"]=username;
    data_sender["token"]=token;
    $.ajax({
        url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/getCartera/",
        type: 'post',
        data: data_sender,
        dataType: 'JSON',
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Error al crear el registro, reinténtelo más tarde');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data)  {
         var rates = data.rates;
         var keys = Object.keys(rates);
         for(var i=0;i<=keys.length-1;i++){
             var currency = keys[i];
             var value = rates[keys[i]];
             var url_get = "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/convertirEuros/"+currency+"/"+value;
             console.log(url_get);
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
                success: function (data_convertida) {
                 console.log("data recibida");
                 console.log(data_convertida);
                 var hoy = new Date();
                 var hace10dias = new Date(hoy);
                 hace10dias.setDate(hoy.getDate() - 10);
                 var dd = hoy.getDate();
                var mm = hoy.getMonth()+1;
                var yyyy = hoy.getFullYear();
                if(dd<10) {dd='0'+dd}
                if(mm<10) {mm='0'+mm}
                data_inicio_fecha = yyyy +"-"+mm+"-"+dd;
                var dd = hace10dias.getDate();
                var mm = hace10dias.getMonth()+1;
                var yyyy = hace10dias.getFullYear();
                if(dd<10) {dd='0'+dd}
                if(mm<10) {mm='0'+mm}
                data_fin_fecha = yyyy +"-"+mm+"-"+dd;
                console.log(data_convertida.divisaOrigen);
                 $.ajax({
                    url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/buscarPorFechaFiltrando/",
                    type: 'post',
                    timeout: 5000, 
                    dataType: 'json',
                    data:{
                      fecha_inicio:data_fin_fecha,
                      fecha_fin:data_inicio_fecha,
                      currencies:data_convertida.divisaOrigen,
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                      alert('Error al buscar la conversión, reinténtelo más tarde');
                      console.log(JSON.stringify(XMLHttpRequest));
                      console.log(JSON.stringify(textStatus));
                      console.log(JSON.stringify(errorThrown));
                    },
                    success: function (valores_divisas_ultimos_dias) {
                        console.log("entra al final de todo");
                        console.log("data recibida");
                        console.log(data_convertida);
                        console.log("data divisas hoy - 10 dias");
                        console.log(valores_divisas_ultimos_dias);
                        var dataTime=[];
                        var dataset =[];
                        var labels=[];
                        var dataCurrencies=[];
                        for(var i=0;i<=valores_divisas_ultimos_dias.length-1;i++){
                          //console.log(data[i].timestamp);
                          var stringCadena =valores_divisas_ultimos_dias[i].timestamp;
                           var arrayDeCadenas = stringCadena.split("T");
                           dataTime[i]=arrayDeCadenas[0];
                           var rate = valores_divisas_ultimos_dias[i].rates;
                           var keys = Object.keys(rate);
                           //Get labels name
                           labels[i]=keys[i];
                           //Ahora hay que coger las divisas y añadirlas al fichero de datos
                           
                           for(var j=0;j<=valores_divisas_ultimos_dias[i].rates.length-1;j++){
                             //cada una de las cotizaciones con su clave cotizacion-valor por día
                             var currencyJson = valores_divisas_ultimos_dias[i].rates[j];
                             var keysCurrency = Object.keys(currencyJson);
                             console.log(keysCurrency)
                             dataCurrencies[i]=currencyJson[keysCurrency];
                           }
                        }
                        var canvas_grafica = document.createElement("canvas");
                        var div_datos = document.createElement("div");
                        var nombre_id="grafica"+index_elementos;
                        var elementos_id="elementos"+index_elementos;
                        canvas_grafica.id=nombre_id;
                        div_datos.id=elementos_id;
                        var encabezado = document.createElement("div");
                        encabezado.id="encabezado"+index_elementos;
                        var encabezadoOrigen = document.createElement("div");
                        encabezadoOrigen.id="encabezadoOrigen"+index_elementos;
                        var monedaOrigen = document.createElement("div");
                        monedaOrigen.id="monedaOrigen"+index_elementos;
                        var encabezadoCantidad = document.createElement("div");
                        encabezadoCantidad.id="encabezadoCantidad"+index_elementos;
                        var monedaCantidad = document.createElement("div");
                        monedaCantidad.id="monedaCantidad"+index_elementos;
                        var encabezadoConvertida = document.createElement("div");
                        encabezadoConvertida.id="encabezadoConvertida"+index_elementos;
                        var monedaConvertida = document.createElement("div");
                        monedaConvertida.id="monedaConvertida"+index_elementos;
                        document.getElementById("contenido_cartera").appendChild(canvas_grafica); 
                        document.getElementById("contenido_cartera").appendChild(div_datos);     
                        document.getElementById(elementos_id).appendChild(encabezado);     
                        document.getElementById(elementos_id).appendChild(encabezadoOrigen);     
                        document.getElementById(elementos_id).appendChild(monedaOrigen);     
                        document.getElementById(elementos_id).appendChild(encabezadoCantidad);     
                        document.getElementById(elementos_id).appendChild(monedaCantidad);     
                        document.getElementById(elementos_id).appendChild(encabezadoConvertida);     
                        document.getElementById(elementos_id).appendChild(monedaConvertida);
                        var cantidad = data_convertida.cantidad;
                        var divisaOrigen = data_convertida.divisaOrigen;
                        var conversion = data_convertida.conversion;
                        document.getElementById("encabezado"+index_elementos).innerHTML="Conversion";
                        document.getElementById("encabezadoCantidad"+index_elementos).innerHTML="Cantidad a convertir";
                        document.getElementById("monedaCantidad"+index_elementos).innerHTML=cantidad;
                        document.getElementById("encabezadoOrigen"+index_elementos).innerHTML="Moneda Origen";
                        document.getElementById("monedaOrigen"+index_elementos).innerHTML=divisaOrigen;
                        document.getElementById("encabezadoConvertida"+index_elementos).innerHTML="Cantidad en euros";
                        document.getElementById("monedaConvertida"+index_elementos).innerHTML=conversion;     
                        var ctx = document.getElementById(nombre_id).getContext('2d');
                        index_elementos +=1;
                        var chartOptions = {
                          responsive:true,
                          legend: {
                            display: true,
                            position: 'top',
                            labels: {
                              boxWidth: 80,
                              fontColor: 'black'
                            }
                          }, scales: {
                            yAxes: [{
                                ticks: {
                                    max: 10000,
                                    min: 8000,
                                    stepSize:500,
                                }
                            }]
                        }
                        };
                        var chart = new Chart(ctx, {
                            type: 'line',
                            data:{
                            datasets: [{
                            data: dataCurrencies.reverse(),
                            backgroundColor: ['#42a5f5', 'red', 'green','blue','violet','#42a5f5', 'red', 'green','blue','violet'],
                                label: keysCurrency}],
                                labels: dataTime.reverse()},
                            options: {chartOptions}
                          });
                    }});
                }
            });
        }}
  });
      
    });