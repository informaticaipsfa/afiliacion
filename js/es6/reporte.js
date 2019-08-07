

let estiloCSSDocumentos = `<style>
@charset "utf-8";
@page {
    margin: 1.5cm;
    margin-bottom: 0.8cm;
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
/**
 * Hoja de Ruta para los procesos de baja
 */
function HojaDeRuta(){
    var html = $("#_hojaderuta").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}

/**
 * Hosa de Solvencia administrativa
 */
function HojaDeSolvencia(){

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