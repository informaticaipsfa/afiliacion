let opcionesRetroactivo = {
    ordering: false,
    paging: false,   
    searching: false,       
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0
    } ],
    select: {
        style: 'multi'
    },
    scrollY:        300,
    deferRender:    true,
    scroller:       true,
    language: {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar"
    }
};

let nominaRetroactivo= {};
let mesesRetroactivo = [];




function TableHtmlRectroactivo(){
    return `
    <table id="tblConcepto" class="ui celled table table-bordered table-striped dataTable">
        <thead>
            <tr>
                <th style="text-align:center;"><button style="border: none; background: transparent; font-size: 14px;" id="MytblConcepto">
                <i class="fa fa-check-square"></i>  
                </button></th>
                <th>CODIGO</th>                                            
                <th>DESCRIPCION</th>
                <th>NOMINA</th>
                <th>ESTATUS</th>
            </tr>
        </thead>
    </table>`;
}

/**
 * Cargar las nominas de pensiones para retroactivo
 * 
 */
class WMesRetroactivo {
    constructor(){
        this.mes = '';
        this.ano = '';
        this.tipo = '';
    }
    Crear(req){        
        var rs = req.rs;
        $("#cmbMesActivo").html("");
        rs.forEach(e => {
            $("#cmbMesActivo").append(`<option value="${e.desd.substr(0,10) + " | " + e.mes}">${e.desd.substr(0,10) + " | " + e.mes} </option>`);
        });
        $("#_cargando").hide();
    }
    Obtener(){
        return this;
    }
}

function CargarMesPR(){
    if (  parseInt($("#cmbAnoActivo").val()) == 0 ){
        return false; 
    }
    var Obj = new WMesRetroactivo();
    var url = Conn.URL + "nomina/mes/activo";
    Obj.tipo = $("#txtSituacion").val();
    Obj.ano = parseInt($("#cmbAnoActivo").val());
    $("#_cargando").show();
    CargarAPI(url, "POST", Obj.Obtener(), Obj);

}



class WNominaRetroactivo {
    constructor(){
        this.mes = '';
        this.ano = '';
        this.tipo = '';
        this.cedula = '';
        this.familiar = '';

    }
    Crear(req){        
        var rs = req.rs;
        console.log(rs);
        $("#_cargando").hide();
        $("#_TblConceptos").html(TableHtmlRectroactivo());        
        var t = $('#tblConcepto').DataTable(opcionesRetroactivo);
        t.clear().draw();

        rs.forEach(e => {
            console.log(e.cedu);
            var jSon = JSON.parse(e.info);
            var estatus = e.cedu != null? "PAGADA" : "PENDIENTE";            
            jSon.forEach(x => {
                if(estatus == "PAGADA"){
                    t.row.add(['',x.codigo,x.nombre,e.obse, estatus]).draw(false);
                }else{
                    t.row.add(['',x.codigo,x.nombre,e.obse, estatus]).draw(false).select();
                }
            });
        });

        $('#MytblConcepto').click(function() {
            if (t.rows({
                    selected: true
                }).count() > 0) {
                t.rows().deselect();
                return;
            }
    
            t.rows().select();
        });
    
        t.on('select deselect', function(e, dt, type, indexes) {
            if (type === 'row') {
                // We may use dt instead of t to have the freshest data.
                if (dt.rows().count() === dt.rows({
                        selected: true
                    }).count()) {
                    // Deselect all items button.
                    $('#MytblConcepto i').attr('class', 'fa fa-check-square');
                    return;
                }
    
                if (dt.rows({
                        selected: true
                    }).count() === 0) {
                    // Select all items button.
                    $('#MytblConcepto i').attr('class', 'fa fa-square');
                    return;
                }
    
                // Deselect some items button.
                $('#MytblConcepto i').attr('class', 'fa fa-minus-square');
            }
        });

    }
    Obtener(){
        return this;
    }
}




function CargarNominasPR(){
    
    var Obj = new WNominaRetroactivo();
    var url = Conn.URL + "nomina/mes/detalle";
    Obj.tipo = $("#txtSituacion").val();
    var arr = $("#cmbMesActivo").val().split("|", -1);
    Obj.mes = arr[1].trim();
    Obj.ano = parseInt($("#cmbAnoActivo").val());
    Obj.cedula = $("#txtcedula").val();
    $("#_cargando").show();
    $("#btnAsociar").show();
    console.log(Obj);
    CargarAPI(url, "POST", Obj.Obtener(), Obj);

}

function listarConceptosR(){

}

function seleccionarConceptosR(){

}

function calcularRetroactivo(){

}


/**
 * ***************************************
 * Generar calculos para retroactivo
 * 
 */
class XWNomina {
    constructor(){
        this.id = '';
        this.cedula = '';
        this.nombre = '';
        this.tipo = '';
        this.directiva = '';
        this.fechainicio = '';
        this.fechafin = '';
        this.mes = '';
        this.Concepto = [];
        this.fecha = '';
    }
    Crear(req){
        waitingDialog.hide();
        alertNotify('Proceso exitoso', 'success');
        

        //console.error( req.sql );
        console.info( JSON.parse( req.js ) );
        // $("#_nominalista").html(`
            
        //     Total de Asignacion: ${req.asignacion}<br> 
        //     Total de Deducciones: ${req.deduccion}<br>
        //     Total Neto a pagar: ${req.neto}<br> <br>
        //     <h4>
        //     Total de activos: ${req.total}<br>
            
        //     Pensionados a cobrar: ${req.operados}<br>
        //     Pensionados sin pago: ${req.sinpagos}<br>
        //     Incidencias: ${req.incidencias}<br>
        //     Paralizados: ${req.paralizados}<br>
        //     Total de registros procesados: ${req.registros}<br>
        //     </h4><br><br>
        //     Codigo Hash de seguridad: ${req.md5}<br>
        // `);

        $("#mdlNominaLista").modal("show");
        

    }
    Obtener(){
        return this;
    }
}

function operarRetroactivos(){
    var Nom = new XWNomina();
    
    var Tbls = $('#tblConcepto').DataTable();
    var t = Tbls.rows('.selected').data();
    Nom.id  = '';
    Nom.cedula = $("#txtcedula").val();
    Nom.directiva = 'TODAS';
    Nom.nombre = 'NOMINA MENSUAL';
    Nom.tipo = $("#txtSituacion").val();
    var arr = $("#cmbMesActivo").val().split("|", -1);
    Nom.fecha = arr[0].trim();
    Nom.mes = arr[1].trim();
    Nom.codigo = MD5(Nom.cedula + Nom.directiva + Nom.nombre + Nom.tipo + Nom.fecha + Nom.mes);
    Nom.fechainicio = Nom.fecha;
    var fp = Nom.fecha.split("-", -1);
    var d = new Date();
    d.setFullYear(fp[0], fp[1], 0);
    Nom.fechafin = d.toJSON().substring(0,10);
    var i = 0;
    $.each(t, function(c, v){
        var Concepto = new WConcepto(); //Modulo: nomina.js
        console.log(v[4]);
        if (v[4] != 'PAGADA'){
            i++;
            Concepto.codigo = v[1];
            Concepto.nombre = v[2];
            Concepto.partida = v[3];
            Concepto.cuenta = v[4];
            Nom.Concepto.push(Concepto);
        }

    });
    
    if(i > 0){
        var ruta = Conn.URL + "nomina/gretroctivo";
        $('#mdlPrepararNomina').modal('hide');
        waitingDialog.show('Creando nómina por favor espere...');
        CargarAPI(ruta, "POST", Nom, Nom);
    }else{
        alertNotify('El pago ya fue procesado...', 'warning');
        waitingDialog.hide();
        return false;
    }
}