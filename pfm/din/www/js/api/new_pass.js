$( "#new_pass" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#new_pass :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  var page = window.location.href;
  console.log(data);
    console.log(page);
    let m;
    const regex = /token=([^&]*)/;
    var token;
    if ((m = regex.exec(page)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        if(groupIndex==1){
          token=match;
        }
    });
  }
  console.log(token);
  var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:1988/reset/"+token;
  
    if(data.password != data.rep_password){
      alert('Las contraseñas no coinciden.');
      location.href="new_pass.html";
    }else{
    $.ajax({
      url: url_get,
      type: 'post',
      timeout: 5000, 
      data:{
          password:data.password,
      },
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al buscar la recordar la contraseña, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
       if(data.message =="Usuario actualizado"){
        alert("Contraseña actualizado");
        window.location.href = "login.html";     
       }else{
         alert("Fallo en la actualización, por favor repita la operacion");
         window.location.href = "new_pass.html";     
       }
      }
});}
    
  });