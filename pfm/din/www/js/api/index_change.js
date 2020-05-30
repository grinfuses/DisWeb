$("#dashboard").ready(function( event ) {
    var nombre_usuario = window.localStorage.getItem('userName');
    document.getElementById("nombre_usuario").innerHTML = "<b>" + nombre_usuario + "</b>";
    $.ajax({
        url: "https://www.coindesk.com/feed",
        type: 'get',
        timeout: 5000, 
        jsonp: "callback",
        dataType: "jsonp",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Error al buscar la conversión, reinténtelo más tarde');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
            console.log(data);
        }});
});

