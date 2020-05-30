$("#dashboard").ready(function( event ) {
    var nombre_usuario = window.localStorage.getItem('userName');
    document.getElementById("nombre_usuario").innerHTML = "<b>" + nombre_usuario + "</b>";
    $.ajax({
        url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/getLatestNews",
        type: 'get',
        timeout: 5000, 
        dataType: 'json',        
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Error al buscar la conversión, reinténtelo más tarde');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
            for(var i=0;i<=data.length-1;i++){
              var title = data[i].title.toLowerCase();
              var body = data[i].body.toLowerCase();
              var title_aux =title.charAt(0).toUpperCase() + title.slice(1)
              var body_aux =body.charAt(0).toUpperCase() + body.slice(1)
              var titulo = document.createElement("div");
              titulo.id="encabezado_noticia";
              titulo.innerHTML=title_aux;
              var cuerpo = document.createElement("div");
              cuerpo.id="cuerpo_noticia";
              cuerpo.innerHTML=body_aux;
              document.getElementById("ultimas_noticias").appendChild(titulo);     
              document.getElementById("ultimas_noticias").appendChild(cuerpo);     
            }
        }});
});

