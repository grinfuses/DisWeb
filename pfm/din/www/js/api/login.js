$( "#login" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#login :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
  console.log(data);
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
       console.log(data);
       localStorage.setItem('userData', data);
       window.location.href = "dashboard.html";
      }
});
    
  });