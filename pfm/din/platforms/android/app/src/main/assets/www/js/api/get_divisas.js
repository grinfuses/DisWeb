$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

$( "#divisas_form" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#divisas_form :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  
  
    console.log(data.origen);
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/buscarPorFechaFiltrando/";
    console.log(data.dia_inicio);
    if(data.dia_inicio == "" || data.dia_fin ==""){
      alert("No puede estar las fechas vacías, compruebe");
    }else{
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 10000, 
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
            console.log(data);
            var dataTime=[];
            var dataset =[];
            var labels=[];
            var dataCurrencies=[];
            var valor_min =0;
            var valor_max=0;
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
                  var valor_a_comprobar = dataCurrencies[i];
                  if(j==0){
                    valor_min=valor_a_comprobar;
                  }
                  if(valor_a_comprobar >=valor_max ){
                    valor_max = valor_a_comprobar;
                  }
                  if(valor_min >valor_a_comprobar ){
                    valor_min = valor_a_comprobar;
                  }
                }
            }
            //console.log(labels);
            //backgroundColor: ['#42a5f5', 'red', 'green','blue','violet'],
        // var ctx = document.getElementById('myChart').getContext('2d');
        // var ctx2 = document.getElementById('myChart2').getContext('2d');
        // var value_max = valor_max.toFixed(2)+1;
        // var value_min = valor_min.toFixed(2)-1;
        // console.log("valores max y min");
        // var chartOptions = {
        //   responsive:false,
        //   legend: {
        //     display: true,
        //     position: 'top',
        //     labels: {
        //       boxWidth: 80,
        //       fontColor: 'black'
        //     }
        //   }, 
        //   scales: {
        //     yAxes: [{
        //         ticks: {
        //           min: value_min,
        //           max: value_max,
        //         }
        //     }]
        // }
        // };
        
        // var config = {
        //   type: 'line',
        //   data: {
        //     labels: dataTime.reverse(),
        //     datasets: [{
        //       label: keysCurrency,
        //       backgroundColor: ['#42a5f5', 'red', 'green','blue','violet','#42a5f5', 'red', 'green','blue','violet'],
        //       borderColor: ['#42a5f5', 'red', 'green','blue','violet','#42a5f5', 'red', 'green','blue','violet'],
        //       data: dataCurrencies.reverse(),
        //       fill: false,
        //     }]
        //   },
        //   options: {
        //     responsive:true,
        //     tooltips: {
        //       mode: 'index',
        //       intersect: false,
        //     },
        //     hover: {
        //       mode: 'nearest',
        //       intersect: true
        //     },
        //   scales: {
        //       yAxes: [{
        //         display: true,
                
        //         ticks: {
        //           min: value_min,
        //           labelOffset:5,
        //           padding:5
        //         }
        //       }]
        //     }
        //   }
        // };
        // var chart = new Chart(ctx, config);
        // var chart = new Chart(ctx, {
        //   type: 'line',
        //   data:{
        // datasets: [{
        //   data: dataCurrencies.reverse(),
        //   backgroundColor: ['#42a5f5', 'red', 'green','blue','violet','#42a5f5', 'red', 'green','blue','violet'],
        //   label: keysCurrency}],
        //   labels: dataTime.reverse()
        // },
        //   fill:false,
        //   options: {chartOptions}
        // });
        
        // var chart = new Chart(ctx2, {
        //   type: 'bar',
        //   data:{
        // datasets: [{
        //   data: dataCurrencies.reverse(),
        //   backgroundColor: ['#42a5f5', 'red', 'green','blue','violet','#42a5f5', 'red', 'green','blue','violet'],
        //   label: keysCurrency}],
        //   labels: dataTime.reverse()},
        //   options: {chartOptions}
        // });
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
        document.getElementById("encabezadoEstimacion").innerHTML="<b>Estimación de compra y venta</b>";
        document.getElementById("estimacionCompra").innerHTML=string_estimacion_compra;  
        document.getElementById("estimacionVenta").innerHTML=string_estimacion_venta;        
        var salida_data=[];
        Array.prototype.max = function() {
          return Math.max.apply(null, this);
        };
        
        Array.prototype.min = function() {
          return Math.min.apply(null, this);
        };
        var max_array = dataCurrencies.max();
        var min_array = dataCurrencies.min();
        var salida_data=[];
        for(var i=0;i<=dataCurrencies.length-1;i++){
          if(dataCurrencies[i] == min_array){
            var sub_salida={x:new Date(dataTime[i]),y:dataCurrencies[i],indexLabel: "\u2193 Mínimo",markerColor: "DarkSlateGrey", markerType: "cross"}
          }else if(dataCurrencies[i] == max_array){
            var sub_salida={x:new Date(dataTime[i]),y:dataCurrencies[i], indexLabel: "\u2191 Máximo",markerColor: "red", markerType: "triangle"}
          }else{
          var sub_salida={x:new Date(dataTime[i]),y:dataCurrencies[i]}
        }
          salida_data[i]=sub_salida;
        }
        console.log(salida_data);
        var chart = new CanvasJS.Chart("prueba_canvas", {
          animationEnabled: true,
          theme: "light2",
          axisY:{
            includeZero: false
          },
          data: [{        
            type: "line",
                indexLabelFontSize: 16,
            dataPoints: salida_data,
          }]
        });
        chart.render();
        // chart.defaults.global.defaultFontFamily = "Lato";
        // chart.defaults.global.defaultFontSize = 18;
      }
    });
  }});}
});