function PrepararPago(){
    $("#ModuloTitulo").html("&nbsp;&nbsp;&nbsp;&nbsp;Gestionar Pagos");
    ListarMetodoBanco();
}


class WListarMetodoBanco{
    constructor(){}
    Crear(req){
        $("#btnCuadre").hide();
        $("#cmbSolicitud").html(`<option value="0">NO HAY PAGOS PENDIENTES POR PROCESAR</option>`);
        var i = 0;
        var combo = '';
        req.forEach(e => {
            combo += `<option value="${e.firma}">( ${ e.cantidad } ) ${e.firma}</option>`;            
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

class WCuadreBanco{
    constructor(){}
    Crear(req){
        $("#_tblMetodo").html(CuadreBancoHTML());
        var tM = $('#tblMetodo').DataTable(tablaBasica);
        tM.clear().draw(); 
        var i = 0;       
        req.forEach(e => {
            i++;
            tM.row.add([
                i,
                e.banc,
                e.nomb,
                e.cant,
                numeral(parseFloat(e.neto)).format('0,0.00')
            ]).draw(false);           
        });
    }
    
}
function cuadreBanco(){
    var lst = new WCuadreBanco();
    if($("#cmbSolicitud").val() == "0"){
        return
    }
    var ruta =  Conn.URL + "nomina/cuadrebanco/" + $("#cmbSolicitud").val();
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
            //'autoWidth'   : false
            'autoWidth': false
        });
        tM.clear().draw();
        
        req.forEach(e => {           

            tM.row.add([
                e.nomb,
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

function ReporteFinanza(){
    var lst = new WListarPendientes();
    $("#ModuloTitulo").html("&nbsp;&nbsp;&nbsp;&nbsp;Ver nóminas pendientes");
    var ruta =  Conn.URL + "nomina/listarpendientes/4";
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
            <th>#</th>
            <th>CODIGO</th>
            <th>DESCRIPCIÓN DEL BANCO</th>
            <th>CANTIDAD</th>
            <th>MONTO </th>
        </tr>
        </thead>
        <tbody>
        </tbody>
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
        class="btn btn-md btn-success pull-rigth" onclick="downloadP('temp/banco/${$("#cmbSolicitud").val()}.zip')">
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

    var ruta =  Conn.URL + "nomina/metodobanco/" + $("#cmbSolicitud").val() + "/300";
    CargarAPI(ruta, "GET", lst, lst);
 }