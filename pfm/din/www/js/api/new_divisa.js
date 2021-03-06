$("#nueva_divisa_cartera").ready(function( event ) {
  var nombre_usuario = window.localStorage.getItem('userName');
  document.getElementById("nombre_usuario").innerHTML = "<b>" + nombre_usuario + "</b>";
});

$( "#nuevo_registro" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#nuevo_registro :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
    });
  var usernameLogin = window.localStorage.getItem('usernameLogin');
  var token = window.localStorage.getItem('userToken');
  var string_rate = data.origen+":"+data.cantidad;
  var data_send={};
  data_send["username"]=usernameLogin;
  data_send["rates"]=string_rate;
  data_send["token"]=token;
      $.ajax({
        url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/addToCartera/",
        type: 'post',
        data: data_send,
        dataType: 'JSON',
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Error al crear el registro, reinténtelo más tarde');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
         alert('Nueva moneda añadida creado');
         location.href="cartera.html";
        }
  });
});