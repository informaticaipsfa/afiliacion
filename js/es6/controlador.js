 Number.prototype.zeroPadding = function(){
  var ret = "" + this.valueOf();
  return ret.length == 1 ? "0" + ret : ret;
};
function verificarPrivilegioUsuario(){
    $.each(Usuario.Perfil.Privilegios,function (privilegio) {
        switch (this.nombre){
            case "afiliacion.salvar":
                $(".prvsalvar").attr("disabled",false);
                $(".prvsalvar").removeClass('hide');
                break;
            case "afiliacion.modificar":
                $(".prvmodificar").attr("disabled",false);
                $(".prvmodificar").removeClass('hide');
                break;
            case "afiliacion.carnet":
                $(".prvcarnet").attr("disabled",false);
                $(".prvcarnet").removeClass('hide');
                break;
            case "afiliacion.constancia":
                $(".prvcontancia").attr("disabled",false);
                $(".prvcontancia").removeClass('hide');
                break;

        }
    })
}

let FrmValidar = false;
let Usuario = {};
class Menu {
  constructor() {}
  ValidarPrivilegio(Json){
    var Menu = Json.perfil.privilegio;
  }
  //Crear Menu Dinamicamente
  Crear(Json) {

      var e = sessionStorage.getItem("ipsfaToken");
      var s = e.split(".");
      var MenuJS = JSON.parse(atob(s[1]));
      var Menu = MenuJS.Usuario.Perfil.Menu;
      var cadena = "<li class='header'>Menu</li>";
      Menu.forEach(v => {
        if(v.url != undefined){
          cadena += `<li><a href="${v.url}"><i class="${v.icono}"></i><span>${v.nombre}</span></a></li>`;
        }else{
          cadena += `<li><a href="#" onclick="CargarUrl('_cuerpo','${v.js}');${v.accion}"><i class="${v.icono}"></i><span>${v.nombre}</span></a></li>`;
        }
      });
			$('#_menu').html(cadena);
        verificarPrivilegioUsuario();
  }
}
class Estado{
  constructor() {

  }
  Crear(Json) {
    if (sessionStorage.getItem('ipsfaEstado') == undefined ){
  		 sessionStorage.setItem('ipsfaEstado', JSON.stringify(Json));
  	}
  }
  ObtenerEstados(){
    let estado = JSON.parse(sessionStorage.getItem('ipsfaEstado'));

    $("#cmbmestado").html('<option value="S" selected="selected"></option>');
    $("#cmbestadof").html('<option value="S" selected="selected"></option>');
    $.each(estado, function (c, v){
      $("#cmbmestado").append('<option value="' + v.codigo + '">' + v.nombre + '</option>');
      $("#cmbestadof").append('<option value="' + v.codigo + '">' + v.nombre + '</option>');
    });

  }
  ObtenerCiudadMunicipio(estado, nombre){
    var sciudad = 'cmbmciudad';
    var smunicipio = 'cmbmmunicipio';
    if ( nombre != undefined){
      sciudad = 'cmbciudadf';
      smunicipio = 'cmbmunicipiof';
    }
    var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
    $.each(cm, function(c, v){
      if (v.codigo == estado){

        let ciudad = v.ciudad;
        let municipio = v.municipio;
        $("#" + sciudad).html('<option value="S" selected="selected"></option>');
        $("#" + smunicipio).html('<option value="S" selected="selected"></option>');
        $.each(ciudad, function (c,v){
          $("#" + sciudad).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
        });
        $.each(municipio, function (c,v){
          $("#" + smunicipio).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
        });
      }
    });
  }
  ObtenerParroquia(estado, municipio, nombre){
    var sparroquia = 'cmbmparroquia';
    if ( nombre != undefined){
      sparroquia = 'cmbparroquiaf';
    }
    var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
    $.each(cm, function(c, v){
      if (v.codigo == estado){
        var mun = v.municipio;
        $.each(mun, function (c,v){
          if(v.nombre == municipio){
            $("#" + sparroquia).html('<option value="S"></option>');
            $.each(v.parroquia, function(cl, vl){
              $("#" + sparroquia).append('<option value="' + vl + '">' + vl + '</option>');
            });
          }
        });
      }
    });
  }
}

var Mnu = new Menu();
var Conn = new Conexion();
var Util = new Utilidad();
var Estados = new Estado();

$(function () {
  CargarAPI(Conn.URL + "estado", "GET", "", Estados);
  CargarUrl("_bxBuscar", "afi/buscar");
  CargarUrl("_bxTarjeta", "afi/tarjeta");
  CargarUrl("_bxDatoBasico", "afi/datobasico");
  CargarUrl("_bxDatosFamiliar", "afi/familiar");
  CargarUrl("_bxTarjetaFamiliar", "afi/tarjetafamiliar");
  CargarUrl("_boxModFamiliares", "afi/modalfamiliares");

  CargarUrl("_contenidofamiliar", "afi/familiarmodalcontinuar");
  CargarUrl("_contenidoh", "afi/historicomilitar");
  CargarUrl("_contenidorpt", "rpt/constancia");
  CargarUrl("_contenidocps", "rpt/constanciapensionsobr");
  CargarUrl("_objectPDF", "rpt/carnet");
  CargarUrl("_objectPDF2", "rpt/carnetfamiliar");

  CargarUrl("_bxContenedores", "afi/contenedores");

  $("#salvar").hide();
  $('#modMsj').on('shown.bs.modal', function () {
    $('#_aceptar').focus();
  });

  IniciarSesion();
  Mnu.Crear("Cargar...");
});
function Principal(){
    $(location).attr("href","starter.html");
}

function Enter(e){
  if(e.keyCode == 13) {
      Buscar();
  }
}

function CiudadMunicipio(valor){
  if (valor == undefined){
    Estados.ObtenerCiudadMunicipio($("#cmbmestado option:selected").val());
  }else{
    Estados.ObtenerCiudadMunicipio($("#cmbestadof option:selected").val(), true);
  }
}
function SeleccionarParroquia(valor){
  if (valor == undefined){
    Estados.ObtenerParroquia($("#cmbmestado option:selected").val(), $("#cmbmmunicipio option:selected").val());
  }else{
    Estados.ObtenerParroquia($("#cmbestadof option:selected").val(), $("#cmbmunicipiof option:selected").val(), true);
  }
}

function CargarUrl(id, url){
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'inc/' + url + '.html');
  xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
          $('#'+id).html(xhttp.responseText);
       }
   };
   xhttp.onerror = function() {
       if (this.readyState == 4 && this.status == 0) {
         $.notify("El archivo no ha sido encontrado");
       }

   };
   xhttp.send();
}

function GestionarUsuario() {
  CargarUrl("_cuerpo", "usuario")
}


function Editar(){
  $('#modMsj').modal('show');
}

function HistoricoMilitar(){
  $('#modHistoricoMilitar').modal('show');
}

function HistoriaClinica(){
  $('#modDocumentClinico').modal('show');
}

function readURL(input, id) {
 	var archivo = input.files[0];
	bFile = 0;
	type = 'image.*';
	if(archivo.size < 1000000){
    if (input.files && input.files[0]) {
    	if (!archivo.type.match(type)) {
    		$.notify('El formato de archivo debe ser: (' + type + ')');
    		limpiarObjetos(input, id);
    		return false;
    	}
    	$("#load" + id).show();
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#' + id).attr('src', e.target.result);
          bFile = 1;
        };
    reader.readAsDataURL(input.files[0]);
    $("#load" + id).hide();
    }
  }else{
   limpiarObjetos(input, id);
	 $.notify('No se puede subir un archivo mayor a 1 MB');
 }
}


function limpiarObjetos(input, id){
   input.value = "";
   $('#view-' + id).html('<img style="width: 140px;height: 140px; margin-left: 0px" class="file-path-wrapper-pre-view" id="pre-view-' + id + '" />');
 }

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
}
    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function IniciarSesion(){
  if (sessionStorage.getItem('ipsfaToken') != undefined ){

    var e = sessionStorage.getItem("ipsfaToken");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;


    $("#_PerfilUsuario").html(Usuario.Perfil.descripcion);
    $("#_NombreUsuario").html(Usuario.nombre);

  }
}


/**
 * Listar Carnet's
 *
 **/
function ListarCarnet(estatus) {
    listaCarnet = new LstCarnet();
    Estatus = estatus;
    var ruta = Conn.URL + "carnet/listar/" + estatus;
    CargarAPI(ruta, "GET", "", listaCarnet);
}
