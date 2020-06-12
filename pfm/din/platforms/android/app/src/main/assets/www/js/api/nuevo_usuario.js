
$( "#nuevo_registro_usuario" ).submit(function( event ) {
    event.preventDefault()
    var $inputs = $('#nuevo_registro_usuario :input');
    var data = {};
    $inputs.each(function() {
        data[this.id] = $(this).val();
        if(this.id=="novedades"){
          data[this.id] = $(this).checked;
        }
      }
    );
    console.log(data);
    if(data.password != data.rep_password){
      alert('Las contraseñas no coinciden.');
      location.href="nuevo_usuario.html";
    }else{
      console.log("igual")
      $.ajax({
              url: "http://localhost:1988/nuevoUsuario/",
              type: 'post',
              data: data,
              dataType: 'JSON',
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('Error al crear el usuario, reinténtelo más tarde');
                alert(XMLHttpRequest.responseText);
                console.log(JSON.stringify(XMLHttpRequest));
                console.log(JSON.stringify(textStatus));
                console.log(JSON.stringify(errorThrown));
              },
              success: function (data) {
               alert('Usuario creado.');
               location.href="index.html";
              }
        });
    }     
  });