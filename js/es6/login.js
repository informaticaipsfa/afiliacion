var Conn = new Conexion();
class Login {
  constructor(usr, clv) {
    this.nombre = usr;
    this.clave = clv;
  }
  Login(){
    return this;
  }
}


$(function (){
  $('#clave').keyup(function(e){
    if(e.keyCode == 13) {
        Ingresar();
    }
  });
});

function Ingresar(){
  if ($("#usuario").val() == ""){
    $.notify("No ha introducido usuario", "warn");
    $("#usuario").focus();
    $("#_login").attr("disabled", true);
    return false;
  }
  if ($("#clave").val() == ""){
    $.notify("No ha introducido clave", "warn");
    $("#clave").focus();
    $("#_login").attr("disabled", true);
    return false;
  }
  let login = new Login($("#usuario").val(), $("#clave").val());
  var xhttp = new XMLHttpRequest();
  $("#_cargando").show();

  xhttp.open("POST", Conn.URLSEC + "/ipsfa/app/api/wusuario/login", true);
  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {
     json = JSON.parse(xhttp.responseText);
     sessionStorage.setItem('ipsfaToken', json.token);

     var s = json.token.split(".");
     var MenuJS = JSON.parse(atob(s[1]));
     if(MenuJS.Usuario.modulo != undefined){
       //console.log(MenuJS.Usuario.modulo);
       $(location).attr("href", MenuJS.Usuario.modulo + "/starter.html");
     }else{
       //console.log(MenuJS);
       $(location).attr("href","starter.html");
     }
   }
   if(this.status === 403){
     $.notify("Verifique usuario o clave");
     $("#_login").attr("disabled", true);
     $("#usuario").val("");
     $("#clave").val("");
     $("#usuario").focus();
     $("#_cargando").hide();
   }
  };
  xhttp.onerror = function() {
       if (this.readyState === 4 && this.status === 0) {

         $.notify("No se puede conectar al servidor");
         $("#_login").attr("disabled", true);
         $("#usuario").val("");
         $("#clave").val("");
         $("#usuario").focus();
         $("#_cargando").hide();
         //$.notify("Intente mas tarde", "success");
       }
   };

  xhttp.send(JSON.stringify(login.Login()));
}

function ActivarIniciar(){
  $("#_login").attr("disabled", false);
}
