class WListarNominasPagadas{
    constructor(){}
    Crear(req){
        $("#btnCuadre").hide();
        $("#cmbSolicitud").html(`<option value="0">NO HAY PAGOS PENDIENTES POR PROCESAR</option>`);
        var i = 0;
        var combo = '';
        req.forEach(e => {
            combo += `<option value="${e.firma}">( ${ e.cantidad } ) ${e.obse} - ${e.mes} - RECHAZOS</option>`;            
            i++;
            $("#btnCuadre").show();
        });
        if(i > 0){
            $("#cmbSolicitud").html(`<option value="0">NO HAY PAGOS PENDIENTES POR PROCESAR</option> ${combo}`);
            
        }
    }
}

function ListarNominasPagadas(){
    var lst = new WListarNominasPagadas();
    var ruta =  Conn.URL + "nomina/listarpagos";
    CargarAPI(ruta, "GET", lst, lst);
}


class WConsultarNetosNomina{
    constructor(){}
    Crear(req){
        console.log(req);
        $("#mdlRechazosNeto").modal('show');

        $("#_divRechazos").html(RechazosNetoHTML());
        var tlstD = $('#tblRechazosNeto').DataTable({
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
        tlstD.clear().draw();
        var i = 0;
        req.forEach(e => {
            i++;

            var btn = `<button type="button" id="btnMod${i}"
            class="btn btn-sm btn-primary prvmodificar" onclick="agregarRechazo('${e.oidpago}')">
            <i class="fa fa-random"></i></button>`
            tlstD.row.add([
                i,
                e.oidpago,
                e.cedu,
                e.tipo,
                e.banc,
                e.nume, //e.cant,
                e.neto,
                btn
            ]).draw(false);
        });
        tlstD.column(1).visible(false);
    }
}




function ConsultarNetosNomina(){
    var one = new WConsultarNetosNomina();
    var ruta = Conn.URL + "nomina/verpagosindividual/" + $("#cmbSolicitud option:selected").val() + "/" + $("#txtcedula").val();
    CargarAPI(ruta, "GET", one, one);
    
} 



/**
 * HTML para el detalle de la nómina
 */
function RechazosNetoHTML(){
    //<th>Cantidad</th>
    return `<table id="tblRechazosNeto" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>COD</th>
                <th>Cedula</th>            
                <th>Tipo</th>
                <th>Banco</th>
                <th>Cuenta</th>
                <th>Neto</th>   
                <th>ACCION</th>              
            </tr>
        </thead>
    </table>`;
}



class WRechazos{
    constructor(){
        this.codigo = '';
        this.banco = '';
        this.tipo = '';
        this.cuenta = '';
    }
    Crear(req){
        $("#mdlRechazosNeto").modal('hide');
        ListarRechazos();
        cuadreBanco('rechazos');
        //console.error("HOLAAAAAAAAAAAA");
    }
}
/**
 * Agregar Control 
 */
function agregarRechazo(codigo){

    var wRechazos = new WRechazos();
    wRechazos.codigo = codigo;
    wRechazos.banco = $("#cmbminstfinanciera").val();
    wRechazos.tipo = $("#cmbmtipofinanciera").val();
    wRechazos.cuenta = $("#txtmnrocuenta").val();

    var ruta = Conn.URL + "rechazos/agregar";
    CargarAPI(ruta, "POST", wRechazos, wRechazos);
    
    
}

class WLRechazos{
    constructor(){}
    Crear(req){
        $("#btnImprimir").hide();
        $("#btnPreparar").hide();
        $("#_dtNR").hide();
        cuadreBanco('rechazos');
        var titulo = "Detalle de los Rechazos " + $("#cmbSolicitud option:selected").text();
        $("#lblTituloRechazos").html(titulo);

        
        $("#_divNR").html(ListarRechazosHTML());
        var tblNR = $('#tblNR').DataTable({
            'destroy': false,
            'paging': true,
            'lengthChange': false,
            'searching': true,
            'autoPrint': true,
            'ordering': false,
            'info': true,
            'autoWidth': false
            
        });
        tblNR.clear().draw();
        var i = 0;
        req.forEach(e => {
            i++;
            var modificar = `
                <button type="button" id="btneliminarRechazos${i}"
                class="btn btn-sm btn-danger" onclick="msjeliminarRechazos('${e.oid}')">
                <i class="fa fa-close"></i></button>`;
            tblNR.row.add([
                i,
                e.oid,
                e.cedu,
                e.cfam,
                e.tipo,
                e.banc,
                e.nume, //e.cant,
                e.neto,
                modificar
            ]).draw(false);
        });
        if (i > 0){
            $("#_dtNR").show();
            $("#btnImprimir").show();
            $("#btnPreparar").show();
        }
    }

}

function ListarRechazos(){
    var wLRechazos = new WLRechazos();
    var ruta = Conn.URL + "rechazos/listar/" + $("#cmbSolicitud option:selected").val();
    CargarAPI(ruta, "GET", wLRechazos, wLRechazos);
}


function msjeliminarRechazos(oid){
   
    $("#_contenido").html(`¿Está seguro que desea eliminar el registro de la nómina de rechazos?`);
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" 
    onclick="eliminarRechazos(${oid})">Si</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
    
}

class WNRechazos{
    constructor(){}
    Crear(req){
        ListarRechazos();
    }

}

/**
 * Eliminar Rechazos nómina
 */
function eliminarRechazos(oid){
    var wNRechazos = new WNRechazos();
    var ruta = Conn.URL + "rechazos/eliminar/" + oid;
    CargarAPI(ruta, "GET", wNRechazos, wNRechazos);
}


/**
 * HTML para el detalle de la nómina
 */
function ListarRechazosHTML(){
    //<th>Cantidad</th>
    return `<table id="tblNR" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>COD</th>
                <th>TITULAR</th>
                <th>CEDULA</th>            
                <th>TIPO</th>
                <th>BANCO</th>
                <th>CUENTA</th>
                <th>NETO</th>   
                <th>ACCION</th>              
            </tr>
        </thead>
    </table>`;
}



function GenerarTxtRechazos(){
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
    $("#divResultFooter").html(`<button type="button" id="btnPreparar" class="btn btn-md btn-success pull-rigth" 
    onclick="pagarMetodoRechazos()">
        Aceptar</button>
    <button type="button" class="btn btn-md btn-danger" data-dismiss="modal" aria-label="Close">
        Cancelar
    </button>`);
}

class WMetodoBancoRechazos{
    constructor(){}
    Crear(req){
        waitingDialog.hide();
       
        $("#mdlPrepararMetodoR").modal("show");
        $("#divResultR").html(`<div class="alert bg-success disabled" role="alert " id="alert" >
            Los archivos para los bancos se han generado correctamente
        </div>
        <div class="row">
            <div class="col-md-12" id="divResult">
                 Los archivos generados por lote se han adjuntado a una carpeta y luego comprimdos 
                 a fines de garantizar su seguridad y la rápidez de transferencia.                                           
            </div>
        </div>`);
        $("#divResultFooterR").html(`<button type="button" id="btnPreparar" 
        class="btn btn-md btn-success pull-rigth" onclick="downloadP('/sssifanb/pensiones/temp/banco/${$("#cmbSolicitud").val()}-XR.zip')">
        Descargar archivo</button>`);
    }
}
 

function pagarMetodoRechazos(){
     
    var lst = new WMetodoBancoRechazos();
    
    if ($("#cmbSolicitud").val() == "0" ){        
        alertNotify("Actualmente no hay pagos pendientes", "danger");
        return false;
    }
    $("#mdlPrepararMetodo").modal("hide");
    waitingDialog.show('Generando archivos bancarios, por favor espere...');
    var cantidad = $("#cantidadtxt").val()!=""?$("#cantidadtxt").val():0;
    var ruta =  Conn.URL + "nomina/metodobancorechazos/" + $("#cmbSolicitud").val() + "/" + cantidad ;
    CargarAPI(ruta, "GET", lst, lst);
 }


 /**
  * 
  */
 function ImprirmirCDPRechazos(){
    

 }