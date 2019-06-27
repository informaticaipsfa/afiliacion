

class WListarConceptosContables{
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

function ListarConceptosContables(){
    var lst = new WListarConceptosContables();
    var ruta =  Conn.URL + "nomina/listarpagos";
    CargarAPI(ruta, "GET", lst, lst);
}


class WNominaDetalleContable{
    constructor(){}
    Crear(req){
        console.log(req);
        $("#_tblDeducciones").html(NDDescuentosHTML());
        var tlstD = $('#lstDeducciones').DataTable({
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
            var codigo = e.codi!=undefined?e.codi:0;
            var cuenta = e.cuenta!=undefined?e.cuenta:0;
            i++;
            tlstD.row.add([
                i,
                e.part,
                cuenta,
                codigo,
                e.conc, //e.cant,
                e.mont
            ]).draw(false);
        });

       


    }
}


function listarNominaDetalleContable(){
    var lst = new WNominaDetalleContable();
    var ruta =  Conn.URL + "nomina/conceptos/contable/" + $("#cmbSolicitud").val();
    CargarAPI(ruta, "GET", lst, lst);

}

/**
 * HTML para el detalle de la nómina
 */
function NDDescuentosHTML(){
    //<th>Cantidad</th>
    return `<table id="lstDeducciones" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Presupuesto</th>            
                <th>Cuenta Contable</th>
                <th>Código</th>
                <th>Descripción</th>
                
                <th>Monto Total</th>
            </tr>
        </thead>
    </table>`;
}


function ImpimirCheque(){
    var html = $("#" + nombre).html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html + '');
    ventana.document.head.innerHTML = `<style>
    @charset "utf-8";
    @page {
        margin: 0cm;
        size: 17.8cm 8cm;

    }
    section {
        page-break-before: always;
    }
    @media screen,print {
    body {
      margin: 0px;
      font-family: Calibri;
      font-weight: bold;
    }`;

}