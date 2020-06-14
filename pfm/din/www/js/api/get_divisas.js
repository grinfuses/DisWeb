$( "#divisas_form" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#divisas_form :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  
    console.log(data.origen);
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/buscarPorFechaFiltrando/";
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 5000, 
      dataType: 'json',
      data:{
        fecha_inicio:data.dia_inicio,
        fecha_fin:data.dia_fin,
        currencies:data.origen,
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al buscar los datos de buscar fecha, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        console.log("rates")
        var keys = Object.keys(data[0].rates[0]);
        var data_origen_get = keys[0];
        console.log(data_origen_get);
        var data_recibida = data;
        $.ajax({
          url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/estimar/",
          type: 'post',
          timeout: 10000, 
          dataType: 'json',
          data:{
            currency:data_origen_get,
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('Error al buscar la estimacion, reinténtelo más tarde');
            console.log(JSON.stringify(XMLHttpRequest));
            console.log(JSON.stringify(textStatus));
            console.log(JSON.stringify(errorThrown));
          },
          success: function (estimaciones,data_recibida) {
            console.log("estimaciones");
            console.log(estimaciones)
            console.log("data_recibida")
            console.log(data_recibida);
            var dataTime=[];
            var dataset =[];
            var labels=[];
            var dataCurrencies=[];
            for(var i=0;i<=data.length-1;i++){
              //console.log(data[i].timestamp);
              var stringCadena =data[i].timestamp;
                var arrayDeCadenas = stringCadena.split("T");
                dataTime[i]=arrayDeCadenas[0];
                var rate = data[i].rates;
                var keys = Object.keys(rate);
                //Get labels name
                labels[i]=keys[i];
                //Ahora hay que coger las divisas y añadirlas al fichero de datos
                
                for(var j=0;j<=data[i].rates.length-1;j++){
                  //cada una de las cotizaciones con su clave cotizacion-valor por día
                  var currencyJson = data[i].rates[j];
                  var keysCurrency = Object.keys(currencyJson);
                  console.log(keysCurrency)
                  dataCurrencies[i]=currencyJson[keysCurrency];
                }
            }
            //console.log(labels);
            //backgroundColor: ['#42a5f5', 'red', 'green','blue','violet'],
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        var value_max = dataCurrencies.max;
        var value_min = dataCurrencies.min;
        var step = (value_max-value_min)/10;
        
        var chartOptions = {
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
        
        var chart = new Chart(ctx2, {
          type: 'bar',
          data:{
        datasets: [{
          data: dataCurrencies.reverse(),
          backgroundColor: ['#42a5f5', 'red', 'green','blue','violet','#42a5f5', 'red', 'green','blue','violet'],
          label: keysCurrency}],
          labels: dataTime.reverse()},
          options: {chartOptions}
        });
        // chart.defaults.global.defaultFontFamily = "Lato";
        // chart.defaults.global.defaultFontSize = 18;
        var encabezadoEstimacion = document.createElement("div");
        encabezadoEstimacion.id="encabezadoEstimacion";
        var estimacionCompra = document.createElement("div");
        estimacionCompra.id="estimacionCompra";
        var estimacionVenta = document.createElement("div");
        estimacionVenta.id="estimacionVenta";
        console.log("estimaciones");
        var estimacion_porcentaje_compra = estimaciones.evaluacion.compra *100;
        var estimacion_porcentaje_venta =  estimaciones.evaluacion.venta *100;
        var string_estimacion_compra = "Recomendación de compra: "+estimacion_porcentaje_compra.toFixed(2) + "%";
        var string_estimacion_venta =  "Recomendación de venta: "+estimacion_porcentaje_venta.toFixed(2) + "%";

        document.getElementById("estimaciones").appendChild(encabezadoEstimacion);
        document.getElementById("estimaciones").appendChild(estimacionCompra);
        document.getElementById("estimaciones").appendChild(estimacionVenta);
        document.getElementById("encabezadoEstimacion").innerHTML="Estimación de compra y venta";
        document.getElementById("estimacionCompra").innerHTML=string_estimacion_compra;  
        document.getElementById("estimacionVenta").innerHTML=string_estimacion_venta;        
      }
    });
  }});
});