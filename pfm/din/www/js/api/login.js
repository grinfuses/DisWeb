$( "#login" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#login :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/login/";
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 5000, 
      data:{
          username:data.user,
          password:data.pass
      },
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al buscar la conversión, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
       if(data.message){
          if(data.message =="Login fail password incorrect"){
            alert("Contraseña incorrecta");
          }else{
            alert("Usuario incorrecta");
          }
       }else{
       localStorage.setItem('usernameLogin', data.usernameLogin);
       localStorage.setItem('userToken', data.token);
       localStorage.setItem('userName', data.name);
       localStorage.setItem('userSurname', data.surname);
       localStorage.setItem('userMail', data.email);
       localStorage.setItem('userPermiso', data.permiso);
       window.location.href = "registrado/dashboard.html";
       }
      }
});
    
  });