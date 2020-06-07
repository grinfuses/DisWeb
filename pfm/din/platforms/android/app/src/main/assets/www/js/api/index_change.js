$("#dashboard").ready(function( event ) {
  $.ajax({
      url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/getMetricasGlobales",
      type: 'get',
      timeout: 5000, 
      dataType: 'json',        
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al buscar la conversión, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data_entrada) {
        console.log(data_entrada)
        var titulo_encabezado = document.createElement("div");
        titulo_encabezado.id="ultimas_cotizaciones";
        var cuerpo_datos = document.createElement("div");
        cuerpo_datos.id="cuerpo_datos";
        var divisas_activas = data_entrada.data.active_cryptocurrencies;
        var dominacion_btc = data_entrada.data.btc_dominance;
        var dominacion_eth = data_entrada.data.eth_dominance;
        var cuota_mercado = data_entrada.data.quote.EUR.total_market_cap;
        var total_criptomonedas = data_entrada.data.total_cryptocurrencies
        var string_salida = " Ultimas cotizaciones ";
        string_salida += " Criptodivisas activas: "+divisas_activas;
        string_salida += " Tasa de dominación del Bitcoin: "+dominacion_btc;
        string_salida += " Tasa de dominación del Ethereum: "+dominacion_eth;
        string_salida += " Total capitalización del mercado: "+cuota_mercado;
        string_salida += " Total de criptomonedas: "+total_criptomonedas;
        cuerpo_datos.innerHTML = string_salida;
        document.getElementById("cotizaciones").innerHTML = string_salida;
      }});
});
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




