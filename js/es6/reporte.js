

let estiloCSSDocumentos = `<style>
@charset "utf-8";
@page {
    margin: 1.5cm;
    margin-bottom: 0.8cm;
    margin-top: 0.8cm;
    size: letter;
}
section {
    page-break-before: always;
}
body {
    margin: 0px;
    font-family: Calibri;
    
}
.baner {
    text-align: center;
    line-height: 22px; 
    font-size: 15px; 
}
p {
    text-align: justify;
    line-height: 22px; 
    font-size: 14px;
}
.wrapper {
    min-height: 100%;
    height: auto !important;
    height: 100%;
    margin: 0 auto -4em;
}
.footer, .push {
    height: 4em;
    font-size: 12px;
}
</style>`;

function CConstanciaAfiliacion() {
    var Util = new Utilidad();
    var urlMil = Conn.URLIMG + $("#txtcedula").val() + ".jpg";
    if (ObjMilitar.Persona.foto  != undefined){
        var url = Conn.URLTEMP;
        urlMil = url + $("#txtcedula").val() + "/foto.jpg";
    }

    var urlGra = "images/grados/" + ObjMilitar.Grado.abreviatura + ".png";
    urlGra = urlGra.toLowerCase();
    var fechaActual = ConvertirFechaActual();
    var tiempo = ObjMilitar.tiemposervicio;

    // $("#_fotoConstancia").attr("src", urlMil);
    // $("#_Constgrado").attr("src", urlGra);

    var gradoPI = 'GENERAL DE DIVISIÓN';
    var clascat = $("#cmbcategoria option:selected").text() + ' / ' + $("#cmbclase option:selected").text();
    var nombrePI = 'RENIER ENRIQUE URBÁEZ FERMÍN';
    //$('#modRpt').modal('show');
    if( $("#cmbCondicion").val() != "2" ){
        $("#lblgradoMil").text($("#cmbgrado option:selected").text());
    }

    $("#lblGradoFoto").text($("#cmbgrado option:selected").text());
    $("#lblcedulaMil").text($("#txtcedula").val());
    $("#lblnombreMil").text($("#txtapellido").val() + ' ' + $("#txtnombre").val());
    $("#lbledoCivilM").text($("#cmbedocivil option:selected").text());
    $("#lblfchNacMil").text($("#txtnacimiento").val());
    $("#lbldireccionMil").text($("#txtmcalle").val() + ' ' + $("#txtmcasa").val() +
        ' ' + $("#txtmapto").val() + ' ' + $("#cmbmparroquia option:selected").text() +
        ' ' + $("#cmbmmunicipio option:selected").text() + ' ' + $("#cmbmciudad option:selected").text() +
        ' ' + $("#cmbmestado option:selected").text());
    $("#lblfchIngresoFANB").text($("#txtfechagraduacion").val());
    $("#lblfchUltAscenso").text($("#_fascenso").html());
    $("#lblaServicio").text(tiempo);
    $("#lblcomponente").text($("#cmbcomponente option:selected").text());
    $("#lblsituacionMil").text($("#cmbsituacion option:selected").text());
    
    
    
    $("#lblfchActual").text(fechaActual);
    $("#lblgradoPI").text(gradoPI);
    $("#lblnombrePI").text(nombrePI);
    $("#lblgradoPIF").text(gradoPI);
    $("#lblclascat").text(clascat);

    var html = $("#_contenidorpt").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}


/**
 * Hoja de Ruta para los procesos de baja
 */
function HojaDeRuta(){

    
    var tiempo_servServ = ObjMilitar.tiemposervicio;

    $("#hrgrado").html($("#cmbgrado option:selected").text());
    $("#hrcedula").html($("#txtcedula").val());
    $("#hrnombre").html($("#txtapellido").val() + ' ' + $("#txtnombre").val());
    $("#hrcomponente").html($("#cmbcomponente option:selected").text());
    $("#hrtiempoServicio").text(tiempo_servServ);
    
    var html = $("#_hojaderuta").html();  
    var ventana = window.open("", "_blank");

    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}

/**
 * Hoja de Solvencia administrativa
 */
function HojaDeSolvencia(){
        
    var tiemposolv = ObjMilitar.tiemposervicio;

    $("#hsapelidosNombre").html($("#txtapellido").val() + ' ' + $("#txtnombre").val());
    $("#solvCedula").html($("#txtcedula").val());
    $("#solvGrado").html($("#cmbgrado option:selected").text());
    $("#solvComponente").html($("#cmbcomponente option:selected").text());
    $("#solvtiempoServicio").text(tiemposolv);

    var html = $("#_hojadesolvencia").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}

/**
 * Hoja de Solvencia administrativa
 */
function ConstanciaCredito(){
    var html = $("#_constanciacredito").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}


/**
 * Constancia de Pension militar
 */
function ConstanciaDePension(){

}

/**
 * Constancia para el tramite de medicamentos en BADAN y LOCATEL
 */
function AutorizacionTratamientos(){
    var nc = $("#txtapellido").val() + " " + $("#txtnombre").val();
    $("#bNombreT").html(nc);
    $("#bCedulaT").html( $("#txtcedula").val() );
    $("#bFechaT").html( Util.ConvertirFechaActualConstancia() );
    var html = $("#_autorizaciontratamiento").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}

/**
 * 
 */
function ConstanciaFAOV(){
    var html = $("#_constanciafaov").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}


class WFideicomiso{
    constructor(){}
    Crear(militar){
        console.log(militar);
        console.log(militar.Componente);
       
        var componente = militar.Componente.nombre;
        var nroCuenta = militar.numero_cuenta;
        var nombre = militar.nombres + " " + militar.apellidos;
        var status = militar.estatus_descripcion;
        var grado = militar.Componente.Grado.descripcion;
        var tiempo_serv = militar.tiempo_servicio;



        $("#fdcedula").html($("#txtcedula").val());
        $("#fdnumeroCuenta").html( nroCuenta );
        $("#fdestatus").html( status);
        $("#fdnombre_apellido").html( nombre );
        $("#fdcomponente").html( componente );
        $("#fdgrado").html( grado );
        $("#fdsexo").html($("#cmbsexo option:selected").text());
        $("#fd_fhingreso").html($("#txtfechagraduacion").val());
        $("#fdtiempoServicio").html( tiempo_serv );

        
        






        var html = $("#_constanciafideicomiso").html();
        var ventana = window.open("", "_blank");
        ventana.document.write(html);
        ventana.document.head.innerHTML = estiloCSSDocumentos;
        ventana.print();
        ventana.close();
    }
}

/**
 * Hoja de Ruta para los procesos de baja
 */
function CConstanciaFideicomiso(){
    var wfide = new WFideicomiso();
    var ruta =  Conn.URL + "militar/pace/consultarbeneficiario/" + $("#txtcedula").val();
    CargarAPI(ruta, "GET", wfide, wfide);
}