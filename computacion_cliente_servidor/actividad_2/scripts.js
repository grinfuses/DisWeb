function toUpperCaseInput() {
  var name = document.getElementById("name");
  name.value = name.value.toUpperCase();
}

function validateEmailPreviously(){
  var email = document.getElementById("email");
   if (!email.value.includes("@"))  
    { 
        alert("Tiene el email mal formado, por favor revise"); 
    } 
}

/*
 * En este apartado se ha creado dos validaciones con javascript,
 * Una primera donde se pone el nombre introducido en mayúsculas usando la función toUpperCase de Javascript nativo
 * e inyectándolo directamente en la página.
 * En otro lado, se ha creado la función de validación de email, en ella, previamente al envío se comprueba que
 * tenga una @ para saber que el email al menos tiene una arroba propia de los correos.
 * Por último, dentro de la página index.php se ha añadido un cambio de color al pasar y quitar el ratón del color
 * de las letras de enviar 
 *
 */