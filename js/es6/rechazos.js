class WListarNominasPagadas{
    constructor(){}
    Crear(req){
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
        console.log(req);
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