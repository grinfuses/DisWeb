$( "#olvide" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#olvide :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  console.log(data);
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/forgot";
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 5000, 
      data:{
          email:data.email,
      },
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al buscar la recordar la contraseña, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        console.log(data);
       if(data.message){
          if(data.message =="Error durante el envio del email"){
            alert("Contraseña incorrecta");
          }else if(data.message =="Error durante el envio del email"){
            alert("No existe usuario con ese correo");
          }else if(data.message =="Enviado correo correctamente"){
            alert("Revise su bandeja de correo para restablecer la contraseña");
            window.location.href = "index.html";     
          }else{
            alert("Error durante el proceso");
          }
       }
      }
});
    
  });