$("#dashboard").ready(function( event ) {
    var nombre_usuario = window.localStorage.getItem('userName');
    document.getElementById("nombre_usuario").innerHTML = "<b>" + nombre_usuario + "</b>";
});

