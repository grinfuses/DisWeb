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
        alert('Error al buscar la conversión, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {

       console.log(data);
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
  var value_max = dataCurrencies.max;
  var value_min = dataCurrencies.min;
  var chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    },
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
  chart.defaults.global.defaultFontFamily = "Lato";
  chart.defaults.global.defaultFontSize = 18;


}
    }); 
  });