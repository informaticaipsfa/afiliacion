

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
    margin: 0 auto -5em;
}
.footer, .push {
    height: 5em;
    font-size: 12px;
}
</style>`

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
        //console.log(militar.Componente);
       
        var componente = militar.Componente.nombre;
        var nroCuenta = militar.numero_cuenta;
        var nombre = militar.nombres + " " + militar.apellidos;
        var status = militar.estatus_descripcion;
        var grado = militar.Componente.Grado.descripcion;
        var tiempo_serv = militar.tiempo_servicio;
        var nro_hijos = militar.numero_hijos;
        var nro_status = militar.no_ascenso;
        var p_profecinalizacion = militar.profesionalizacion;
        
        var año_rec = militar.ano_reconocido;
        
        var mes_rec = militar.mes_reconocido;
        
        var dia_rec = militar.dia_reconocido;
        
        var f_retiro = militar.fecha_retiro;




        $("#fdcedula").html($("#txtcedula").val());
        $("#fdnumeroCuenta").html( nroCuenta );
        $("#fdestatus").html( status);
        $("#fdnombre_apellido").html( nombre );
        $("#fdcomponente").html( componente );
        $("#fdgrado").html( grado );
        $("#fdsexo").html($("#cmbsexo option:selected").text());
        $("#fd_fhingreso").html($("#txtfechagraduacion").val());
        $("#fdtiempoServicio").html( tiempo_serv );
        $("#fdnumHijos").html( nro_hijos );
        $("#fd_status_merito").html( nro_status );
        $("#fd_ultimoAscenso").text($("#_fascenso").html());
        $("#fdstProfesional").html(p_profecinalizacion);
        $("#fdstProfesional").html(año_rec);
        $("#fdmesesRec").html(mes_rec);
        $("#fddiasRec").html(dia_rec);
        $("#fdfechaRetiro").html(f_retiro);

        
        
        
   

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


/**
 * 
 */
class WSolvenciaR{
    constructor(){}
    Crear(req){
        //console.log(req.sueldo_mensual);
        var tp = $("#_tiemposervicio").html().split(" ");
        $("#fingcp").html( $("#txtfechagraduacion").val()  );
        $("#fretcp").html( $("#txtmfecharesuelto").val() );
        var ano = tp[0].split("A");
        $("#facp").html(ano[0]);
        var mes = tp[1].split("M");
        $("#fmcp").html( mes[0] );
        var dia = tp[2].split("D");
        $("#fdcp").html( dia[0] );
        

        $("#cedulacp").html($("#txtcedula").val());
        $("#nombrecp").html($("#txtapellido").val() + ' ' + $("#txtnombre").val());
        var n = parseFloat(req.sueldo_mensual.mt);
        var s = numeral(n).format('0.0,');
        var r1 = s.replace('.', '#');
        var r2 = r1.replace(',', '.');
        var r3 = r2.replace('#', ',');
        $("#montocp").html( r3 );

        var html = $("#_constanciapensionado").html();
        var ventana = window.open("", "_blank");
        ventana.document.write(html);
        ventana.document.head.innerHTML = estiloCSSDocumentos;
        ventana.print();
        ventana.close();
    }
}

/**
 * Constancia de Solvencia
 */
function CConstanciaSolvencia(){
    var wS = new WSolvenciaR();
    var ruta =  Conn.URL + "pensionado/calculo/" + $("#txtcedula").val();
    CargarAPI(ruta, "GET", wS, wS);
}




let FamiliarWSolvenciaRFCP = {};
/**
 * 
 */
class WSolvenciaRFCP{
    constructor(){}
    Crear(req){
        //console.log(req.sueldo_mensual);
        var fam = FamiliarWSolvenciaRFCP.Persona.DatoBasico;


        // var tp = $("#_tiemposervicio").html().split(" ");
        // $("#fingcp").html( $("#txtfechagraduacion").val()  );
        // $("#fretcp").html( $("#txtmfecharesuelto").val() );
        // var ano = tp[0].split("A");
        // $("#facp").html(ano[0]);
        // var mes = tp[1].split("M");
        // $("#fmcp").html( mes[0] );
        // var dia = tp[2].split("D");
        // $("#fdcp").html( dia[0] );
        
        $("#cedulafm").html( fam.cedula  );
        $("#nombrefm").html( fam.apellidoprimero + " " + fam.nombreprimero  );
        $("#relacionfm").html( Util.ConvertirParentesco(FamiliarWSolvenciaRFCP.parentesco, fam.sexo)  );
        


        $("#cedulartps").html($("#txtcedula").val());
        $("#gradotps").html( $("#cmbgrado option:selected").text() + " " + $("#txtapellido").val() + ' ' + $("#txtnombre").val());
        var n = (parseFloat(req.sueldo_mensual.mt) * FamiliarWSolvenciaRFCP.pprestaciones) / 100;
        var s = numeral(n).format('0.0,');
        var r1 = s.replace('.', '#');
        var r2 = r1.replace(',', '.');
        var r3 = r2.replace('#', ',');
        $("#montocps").html( r3 );

        var html = $("#_constanciapensionadosobre").html();
        var ventana = window.open("", "_blank");
        ventana.document.write(html);
        ventana.document.head.innerHTML = estiloCSSDocumentos;
        ventana.print();
        ventana.close();
    }
}

/**
 * Constancia de Solvencia
 */
function CConstanciaSolvenciaFCP(pos){
    var wS = new WSolvenciaRFCP();
    FamiliarWSolvenciaRFCP = ObjMilitar.Familiar[pos-1]
    var ruta =  Conn.URL + "pensionado/calculo/" + $("#txtcedula").val();
    CargarAPI(ruta, "GET", wS, wS);
}