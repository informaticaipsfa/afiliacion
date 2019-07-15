function PrepararPago(){
    $("#ModuloTitulo").html("&nbsp;&nbsp;&nbsp;&nbsp;Gestionar Pagos");
    ListarMetodoBanco();
}


class WListarMetodoBanco{
    constructor(){}
    Crear(req){
        console.log(req);
        $("#btnCuadre").hide();
        $("#cmbSolicitud").html(`<option value="0">NO HAY PAGOS PENDIENTES POR PROCESAR</option>`);
        var i = 0;
        var combo = '';
        req.forEach(e => {
            combo += `<option value="${e.firma}">( ${ e.cantidad } ) ${e.obse} - ${e.mes} </option>`;            
            i++;
            $("#btnCuadre").show();
        });
        if(i > 0){
            $("#cmbSolicitud").html(combo);
        }
    }
}

function ListarMetodoBanco(){
    var lst = new WListarMetodoBanco();
    var ruta =  Conn.URL + "nomina/listarpagos";
    CargarAPI(ruta, "GET", lst, lst);
}

const formatter = new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    minimumFractionDigits: 2,
  });

class WCuadreBanco{
    constructor(){}
    Crear(req){
        $("#_tblMetodo").html(CuadreBancoHTML());
        var tM = $('#tblMetodo').DataTable({
            'destroy': false,
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'autoPrint': true,
            'ordering': false,
            'info': false,
            'autoWidth': false,
            'buttons': [
                'copy', 'excel', 'pdf'
            ]
        });
        tM.clear().draw(); 

       
        var i = 0;
        var chtotal = 0;
        var chcanti = 0;
        var ahtotal = 0;
        var ahcanti = 0;
        var cototal = 0;
        var cocanti = 0;
        var totalneto = 0;  
        var totalcant = 0;  
        var llave = $("#cmbSolicitud").val();
        $.each(req, function(c, v){
            i++;
            var chequecant = 0;
            var chequeneto = 0;
            var ahorroneto = 0;
            var ahorrocant = 0;
            var corrienteneto = 0;
            var corrientecant = 0;
            var cantidad  = 0;
            var neto = 0;
            var nombre = v[0].nomb!=undefined?v[0].nomb:'CHEQUE';
            var obj = obtenerPosicion(v,c);
            if(c == "0000"){
                chequeneto = obj.cheque.neto!=undefined?obj.cheque.neto:0;
                chequecant = obj.cheque.cant!=undefined?obj.cheque.cant:0;
                neto = parseFloat(chequeneto);
            }else{
                ahorroneto = obj.ahorro.neto!=undefined?obj.ahorro.neto:0;
                ahorrocant = obj.ahorro.cant!=undefined?obj.ahorro.cant:0;
                corrienteneto = obj.corriente.neto!=undefined?obj.corriente.neto:0;
                corrientecant = obj.corriente.cant!=undefined?obj.corriente.cant:0;
                cantidad  = ahorrocant + corrientecant;
                neto = parseFloat(ahorroneto) + parseFloat(corrienteneto);
            }
            cantidad = parseInt(chequecant) + parseInt(ahorrocant) + parseInt(corrientecant);
            chtotal += parseFloat(chequeneto);
            chcanti += parseInt(chequecant); //
            ahtotal += parseFloat(ahorroneto); //
            ahcanti += parseInt(ahorrocant);
            cototal += parseFloat(corrienteneto);
            cocanti += parseInt(corrientecant); //
            totalcant += cantidad;
            totalneto += neto; //

            tM.row.add([
                i,
                c,
                nombre,
                `<a href="#!" onClick="listarDetallesPago('${llave}','${c}','CH')">${chequecant}</a>`,
                Intl.NumberFormat("de-DE").format(Number(chequeneto.toFixed(2))),
                `<a href="#!" onClick="listarDetallesPago('${llave}','${c}','CA')">${ahorrocant}</a>`,
                Intl.NumberFormat("de-DE").format(Number(parseFloat(ahorroneto).toFixed(2))),
                `<a href="#!" onClick="listarDetallesPago('${llave}','${c}','CC')">${corrientecant}</a>`,
                Intl.NumberFormat("de-DE").format(Number(parseFloat(corrienteneto).toFixed(2))),
                cantidad,
                Intl.NumberFormat("de-DE").format(Number(parseFloat(neto).toFixed(2)))        //numeral(parseFloat(e.neto)).format('0,0.00')
            ]).draw(false);
        });
        tM.row.add([
            '',
            '',
            '',
            chcanti,
            Intl.NumberFormat("de-DE").format(Number(parseFloat(chtotal).toFixed(2))),
            ahcanti,
            Intl.NumberFormat("de-DE").format(Number(parseFloat(ahtotal).toFixed(2))),
            cocanti,
            Intl.NumberFormat("de-DE").format(Number(parseFloat(cototal).toFixed(2))),
            totalcant,
            Intl.NumberFormat("de-DE").format(Number(parseFloat(totalneto).toFixed(2)))         //numeral(parseFloat(e.neto)).format('0,0.00')
        ]).draw(false);
        $("#btnImprimir").show();
        $("#btnPreparar").show();
    }
    
}

function obtenerPosicion(v, codigo){
    var cant = v.length;    
    var CA = {};
    var CC = {}; 
    var CH = {}; 
    var neto = 0.00;
    var cantidad = 0;
    for(var i=0; i < cant; i++){        
        if(codigo == "0000") {
            neto += parseFloat(v[i].neto);
            cantidad += parseInt(v[i].cant);
            CH =  { neto : neto, cant : cantidad };
        }else{
            if(v[i].tipo == "CA"){
                CA = { neto : v[i].neto, cant : v[i].cant};
            }else if(v[i].tipo == "CC"){
                CC = { neto : v[i].neto, cant : v[i].cant};
            }else{
    
            }
        }
    }
    return { 
        ahorro: CA, 
        corriente: CC, 
        cheque : CH 
    };
}

function cuadreBanco(tabla){
    var lst = new WCuadreBanco();
    if($("#cmbSolicitud").val() == "0"){
        return
    }
    var ruta =  Conn.URL + "nomina/cuadrebanco/" + $("#cmbSolicitud").val() + "/" + tabla;
    CargarAPI(ruta, "GET", lst, lst);
}

class WListarPendientes{
    constructor(){}
    Crear(req){
        $("#_tblNomina").html(ResumenHTML());
        var tM = $('#tblNomina').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': false,
            'autoWidth': false
        });
        tM.clear().draw();
        /**<button type="button" onclick = "verPartida('${e.oid}');" class="btn btn-primary btn-flat"
                    data-toggle="tooltip" data-placement="top" title="Resumén Presupuestario"><i class="fa fa-book"></i></button> */

        req.forEach(e => {           
            var firma = ` <div class="btn-group">
                    
                    <button type="button" onclick = "downloadP('${e.url}tmp/${e.nomb}.csv');" class="btn btn-success btn-flat
                    data-toggle="tooltip" data-placement="top" title="Descargar CSV "><i class="fa fa-download"></i></button>
                    <button type="button" onclick = "downloadP('${e.url}tmp/${e.nomb}-ERR.csv');" class="btn btn-warning btn-flat
                    data-toggle="tooltip" data-placement="top" title="Incidencias"><i class="fa fa-file-text-o"></i></button>
                    <button style="display:none" type="button" onclick = "CoeficienteVariacion(${e.oid})" class="btn bg-purple btn-flat"
                    data2-toggle="tooltip" data-placement="top" title="Coeficiente de Variación">
                    <i class="fa fa-area-chart"></i></button>
                </div>
                
                `;

                //<button style="border: none; background: transparent; font-size: 14px;" 
                // id="MytblBtn" onclick="javascript:window.open('/sssifanb/pensiones/tmp/${e.nomb}.csv')">
                // <i class="fa fa-check-square"></i>  
                // </button>
            tM.row.add([
                firma,
                e.obse,
                e.desd.substr(0, 10),
                e.hast.substr(0, 10),
                e.tipo,
                e.cant,
                numeral(parseFloat(e.asig,2)).format('0,0.00'),
                numeral(parseFloat(e.dedu)).format('0,0.00'),
                numeral(parseFloat(e.mont)).format('0,0.00'),
                e.oid
            ]).draw(false);
           
        });
        tM.column(9).visible(false);
    }

}

function ListarNominasGeneral(){
    var lst = new WListarPendientes();
    var ruta =  Conn.URL + "nomina/listarpendientes/" + $("#cmbSolicitud").val() + "/4";
    CargarAPI(ruta, "GET", lst, lst);
}

/**
 * HTML TABLE
 */

function ResumenHTML(){     
    var html = `<table class="ui celled table" cellspacing="0" width="100%" id="tblNomina" >
        <thead>
        <tr>
            <th>FIRMA</th>
            <th>DESCRIPCIÓN</th>
            <th>DESDE</th>
            <th>HASTA</th>
            <th>TIPO</th>
            <th>CANTIDAD</th>
            <th>ASIGNACIÓN</th>
            <th>DEDUCCIÓN</th>
            <th>MONTO</th>
            <th>ID</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
        
        </tfoot>
        </table>`;
    return html;
 }


/**
 * HTML TABLE
 */

function CuadreBancoHTML(){     
    var html = `<table class="ui celled table" cellspacing="0" width="100%" id="tblMetodo" >
        <thead>
        <tr>
            <th colspan=3>DATOS DEL BANCO</th>
            <th colspan=2>CHEQUES</th>
            <th colspan=2>CUENTAS DE AHORRO</th>
            <th colspan=2>CUENTAS CORRIENTES</th>
            <th colspan=2>TOTAL POR BANCO</th>
        </tr>
        <tr>
            <th>#</th>
            <th>CODIGO</th>
            <th>DESCRIPCIÓN DEL BANCO</th>
            <th>NUM</th>
            <th>MONTO </th>
            <th>NUM</th>
            <th>MONTO </th>
            <th>NUM</th>
            <th>MONTO </th>
            <th>NUM</th>
            <th>MONTO </th>
        </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
            
        </tfoot>
        </table>`;
    return html;
 }


function GenerarTxt(){
    $("#mdlPrepararMetodo").modal("show");
    $("#divResult").html(`<div class="alert bg-info disabled" role="alert " id="alert" >
        Los metodos a banco se generan el grupo mediante las diferentes firmas
    </div>
    <div class="row">
        <div class="col-md-12" id="divResult">
            <label>Cantidad de persona en txt</label>                        
            
            <input type="text" class="form-control" onkeypress="return Util.SoloNumero(event,this)"
            placeholder="Cantidad Personas" id='cantidadtxt' /> 
                                        
        </div>
    </div>`);
    $("#divResultFooter").html(`<button type="button" id="btnPreparar" class="btn btn-md btn-success pull-rigth" onclick="pagarMetodo()">
        Aceptar</button>
    <button type="button" class="btn btn-md btn-danger" data-dismiss="modal" aria-label="Close">
        Cancelar
    </button>`);
}
class WMetodoBanco{
    constructor(){}
    Crear(req){
        waitingDialog.hide();
        $("#mdlPrepararMetodo").modal("show");
        $("#divResult").html(`<div class="alert bg-success disabled" role="alert " id="alert" >
            Los archivos para los bancos se han generado correctamente
        </div>
        <div class="row">
            <div class="col-md-12" id="divResult">
                 Los archivos generados por lote se han adjuntado a una carpeta y luego comprimdos 
                 a fines de garantizar su seguridad y la rápidez de transferencia.                                           
            </div>
        </div>`);
        $("#divResultFooter").html(`<button type="button" id="btnPreparar" 
        class="btn btn-md btn-success pull-rigth" onclick="downloadP('/sssifanb/pensiones/temp/banco/${$("#cmbSolicitud").val()}.zip')">
        Descargar archivo</button>`);
    }
}
 
function pagarMetodo(){
     
    var lst = new WMetodoBanco();
    
    if ($("#cmbSolicitud").val() == "0" ){        
        alertNotify("Actualmente no hay pagos pendientes", "danger");
        return false;
    }
    $("#mdlPrepararMetodo").modal("hide");
    waitingDialog.show('Generando archivos bancarios, por favor espere...');
    var cantidad = $("#cantidadtxt").val()!=""?$("#cantidadtxt").val():0;
    var ruta =  Conn.URL + "nomina/metodobanco/" + $("#cmbSolicitud").val() + "/" + cantidad ;
    CargarAPI(ruta, "GET", lst, lst);
 }

class WLstPago{
    constructor(){
        this.llave = '';
        this.codigo = '';
        this.tipo = '';
    }
    Crear(req){
        $("#_cargandop").show()
        $("#_tbldtpagos").html(DetallePagoHTML());
        var tM = $('#tbldtPago').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': true,
            'ordering': false,
            'info': false,
            'autoWidth': false
        });
        tM.clear().draw();
        

        req.forEach(e => {
            tM.row.add([
                e.cedu,
                e.nombre,
                e.nume,
                Intl.NumberFormat("de-DE").format(e.neto)
            ]).draw(false);           
        });
        $("#_cargandop").hide();
        $("#mdlDetallesDePago").modal("show");
    }
}
function listarDetallesPago(llave, codigo, tipo){
    var lst = new WLstPago();
    lst.llave = llave;
    lst.codigo = codigo;
    lst.tipo = tipo;
    var ruta =  Conn.URL + "nomina/listarpagosdetalles";
    CargarAPI(ruta, "POST", lst, lst);
}

function DetallePagoHTML(){
    var html = `<table class="ui celled table" cellspacing="0" width="100%" id="tbldtPago" >
        <thead>
        <tr>
            <th>CEDULA</th>
            <th>NOMBRE</th>
            <th>CUENTA</th>            
            <th>NETO A PAGAR</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>        
        </tfoot>
        </table>`;
    return html;
}

// @page {
//         margin: 0cm;
//         size: 8.5cm 5.4cm;
//     }
//     section {
//         page-break-before: always;
//     }
function ImprimirCuadreDosP() {
    var html = $("#_tblMetodo").html();
    var nominastr = $("#cmbSolicitud option:selected").text();
    var ventana = window.open("", "_blank");

    var contenido = `<center>
    <div style="background: url('../images/fondo.png') no-repeat center;">
    <table style="width:800px"  class="membrete" style="border: 0px solid #CCC9C8;">
    <tr style="border: 0px solid #CCC9C8;">
        <td width="200px" valign="top" style="border: 0px solid #CCC9C8;"><center><img  style="width: 100px;height: 100px; margin-left: 0px" 
        class="img-responsive file-path-wrapper-pre-view" src="images/logo_ipsfa.png" id="_imgescudo"/></center>
        </td>
        <td width="400px" style="border: 0px solid #CCC9C8;">
            <center>
            REPÚBLICA BOLIVARIANA DE VENEZUELA <BR>
            MINISTERIO DEL PODER POPULAR PARA LA DEFENSA<BR>
            VICEMINISTERIO DE SERVICIOS, PERSONAL Y LOGÍSTICA<BR>
            DIRECCIÓN GENERAL DE EMPRESAS Y SERVICIOS<BR>
            INSTITUTO DE PREVISIÓN SOCIAL DE LA FUERZA ARMADA<BR>
            RIF: G20003692-3
            </center>
        </td>
        <td width="200px" valign="top" style="border: 0px solid #CCC9C8;"></td>
        </tr>
    </table >
        <h3>
        RELACION DE PAGOS Y DEPOSITOS POR ENTIDADES BANCARIAS<BR>
        ${nominastr}<BR>ss
        DESDE EL 01 DE JULIO AL 31 DE JULIO DEL AÑO 2019
    </h3><BR></div>`;

    //
    var doc = contenido + html;
    ventana.document.write(doc);
    ventana.document.head.innerHTML = `
    <style>
    @charset "utf-8";    
      body {
        margin: 0px;
        font-family: Calibri;
        font-weight: bold;
      }
      table th, tr, td{
        font-family: Calibri;
        font-size: 11px;
        border: 1px solid #CCC9C8;
      }
      thead {
          background-color: #F2EEED;
      }
      a {

      }
      
    </style>`;
    ventana.print();
    ventana.close();
}