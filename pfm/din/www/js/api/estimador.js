$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

$( "#estimador_form" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#estimador_form :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  console.log(data)
  
    var url_get ="http://ec2-15-236-90-96.eu-west-3.compute.amazonaws.com:1994/estimacion";
    if(data.value == ""){
      alert("No puede estar el cierre vacías, compruebe");
    }else{
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 10000, 
      dataType: 'json',
      data:{
        value:data.value,
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al buscar los datos de buscar fecha, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        console.log(data.toFixed(2));
        var cadena_estimador = "El valor predecido es: " +data.toFixed(2)+ " €";
        document.getElementById("estimacion").innerHTML=cadena_estimador;
        $.ajax({
            url: "http://ec2-15-236-90-96.eu-west-3.compute.amazonaws.com:1994/allNubePuntos",
            type: 'get',
            timeout: 10000, 
            dataType: 'json',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert('Error al buscar los datos de buscar fecha, reinténtelo más tarde');
              console.log(JSON.stringify(XMLHttpRequest));
              console.log(JSON.stringify(textStatus));
              console.log(JSON.stringify(errorThrown));
            },
            success: function (data) {
                var originalPoints= data[0].originalPoints;
                var predictedPoints = data[0].predictedPoints;
                console.log(originalPoints);
                console.log(predictedPoints);
                var chart = new CanvasJS.Chart("grafica", {
                    animationEnabled: true,
                    theme: "light2",
                    axisY:{
                      includeZero: false,
                      title:"Precio en € al cierre",
                    },
                    axisX: {
                        title:"Precio en € a la apertura",
                    },
                    data: [{        
                        type: "scatter",
                        toolTipContent: "<b>Apertura: </b>{x} €<br/><b>Cierre: </b>{y} € ",
                        fillOpacity: .3,
                        indexLabelFontSize: 10,
                        dataPoints: originalPoints,
                        color: "red",
                      },
                        {        
                      type: "line",
                      indexLabelFontSize: 16,
                      toolTipContent: "<b>Apertura: </b>{x} €<br/><b>Cierre: </b>{y} € ",
                      dataPoints: predictedPoints,
                      color: "blue",
                    },
                    
                    ]
                  });
                  chart.render();
          
                  
            }});




      }})
    }});