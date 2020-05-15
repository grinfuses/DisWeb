$( "#divisas_form" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#divisas_form :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  var currencies_data="";
    for(var i=0;i<=data.origen.length-1;i++){
      if(i ==data.origen.length){
        currencies_data +=data.origen[i]+"";
      }else{
      currencies_data +=data.origen[i]+",";
      }
    }
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/buscarPorFechaFiltrando/";
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 5000, 
      dataType: 'json',
      data:{
        fecha_inicio:data.dia_inicio,
        fecha_fin:data.dia_fin,
        currencies:currencies_data,
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
       for(var i=0;i<=data.length-1;i++){
         console.log(data[i].timestamp);
         var stringCadena =data[i].timestamp;
          var arrayDeCadenas = stringCadena.split("T");
          dataTime[i]=arrayDeCadenas[0];
          var rate = data[i].rates;
            var keys = Object.keys(rate);
              //Get labels name
              labels[i]=keys[i];
          for(var j=0;j<=data[i].rates.length-1;j++){
          }
       }
       console.log(labels);
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data:{
	datasets: [{
		data: [60,18,10, 8, 4],
		backgroundColor: ['#42a5f5', 'red', 'green','blue','violet'],
		label: labels}],
		labels: dataTime},
    options: {responsive: true}
  });}
    }); 
  });