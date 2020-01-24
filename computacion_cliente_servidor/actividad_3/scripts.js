function toUpperCaseInput() {
  var name = document.getElementById("name");
  name.value = name.value.toUpperCase();
}

function validatePassword(){
  var password = document.getElementById("password");
  var rep_password = document.getElementById("rep_password");

   if (password.value !== rep_password.value)  
    { 
        alert("las contraseñas no coinciden"); 
    } 
}
