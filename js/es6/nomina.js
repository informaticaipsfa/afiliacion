let opcionesf = {
    destroy: true,
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    'autoWidth': false,
    "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
    "bStateSave": true,
    "language": {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
}


class Concepto {
    constructor(){
        this.codigo = '';
        this.descripcion = '';
        this.formula = '';
        this.tipo = 0;
        this.partida = '';
        this.estatus = 0;
        this.componente = '';
        this.grado = '';
    }

    Obtener(){
        this.codigo = $("#txtCodigo").val();
        this.descripcion = $("#txtDescripcion").val();
        this.formula = $("#txtFormula").val();
        this.tipo = parseInt($("#cmbTipo").val());
        this.partida = $("#txtPresupuesto").val();
        this.estatus = parseInt($("#cmbEstatus").val());
        this.componente = $("#cmbComponente").val();
        this.grado = $("#cmbGrado").val();
        return this;
    }
    Crear(DATA){        
        $("#_cargandol").show();
        var tabla = `
        <table id="tblConcepto" class="table table-hover table-striped">
            <thead>
                <tr role="row">
                    <th>PARTIDA </th>
                    <th>CODIGO</th>                                            
                    <th>DESCRIPCION</th>                   
                </tr>
            </thead>
        </table>`;
        $("#_TblConceptos").html(tabla);        
        var tblP = $('#tblConcepto').DataTable(opcionesf);
        tblP.clear().draw();
        DATA.forEach( v => {           
            
            tblP.row.add([
                v.partida,
                v.codigo,
                v.descripcion
            ]).draw(false);
        });
        $("#_cargandol").hide();
    }

}

function AgregarConceptos(){    
    var Obj = new Concepto();
    var url = Conn.URL + "nomina/concepto";
    $("#_cargando").show();
    CargarAPI(url, "POST", Obj.Obtener());
    LimpiarFormulario();
  }

function LimpiarFormulario(){
    $("#txtCodigo").val('');
    $("#txtDescripcion").val('');
    $("#txtFormula").val();
    $("#txtPresupuesto").val('');
    $("#cmbEstatus").val('')
    $.notify("Envio de datos correctos...", "success");
    $("#_cargando").hide();
    
}

function ActualizarConcepto(){ 
  var Obj = new Concepto();
  var url = Conn.URL + "nomina/concepto/listar";
  CargarAPI(url, "GET", "", Obj);
  
}

function ActivarFechaNomina(){
    $('#fechainicio').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $('#fechavigencia').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
}

class DirCon {

    Crear(DATA){
        
        let fnx  = DATA.fnx;

        let fnxc = DATA.fnxC;
        var tabla = `
        <table id="tblConcepto" class="table table-hover table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>DESCRIPCION</th>                   
                    <th>CODIGO</th>                                            
                    <th>PARTIDA </th>
                </tr>
            </thead>
        </table>`;
        $("#_TblConceptos").html(tabla);        
        var tblP = $('#tblConcepto').DataTable({
            ordering: false,
            paging: false,
            columnDefs: [ {
                orderable: false,
                className: 'select-checkbox',
                targets:   0
            } ],
            select: {
                style: 'multi'
            },
            scrollY:        180,
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
        });

        tblP.clear().draw();
        for (const prop in fnx){          
            tblP.row.add([
                '',
                'DIR-PRIMAS',
                fnx[prop].rs,
                ''
            ]).draw(false);
        };
        console.log(fnxc);
        for (const prop in fnxc){
            tblP.row.add([
                '',
                'DIR-CONCEPTOS',
                fnxc[prop].rs,
                fnxc[prop].part
            ]).draw(false);
        }   
    }
}
function CargarDirectivaConceptos(){
    var Obj = new DirCon();
    var url = Conn.URL + "nomina/directiva/detalle/" + $("#directiva").val();
    console.log(url);
    CargarAPI(url, "GET", "", Obj);
    myStepper.next();
}


class WConcepto {
    constructor(){
        this.codigo = '';
        this.nombre = '';
        this.partida = '';
        this.formula = '';
    }

}

class WNomina {
    constructor(){
        this.id = '';
        this.directiva = '';
        this.fecha = '';
        this.Concepto = [];
    }

    Crear(resq){
        console.log(resq);
    }

}
function GenerarNomina(){
    var Nom = new WNomina();    
    
    var Tbls = $('#tblConcepto').DataTable();
    var t = Tbls.rows('.selected').data();
    Nom.id  = $("#directiva").val();
    Nom.directiva = $("#directiva option:selected").text();
    Nom.fecha = $("#fechainicio").text();
    $.each(t, function(c, v){
        var Concepto = new WConcepto();
        Concepto.nombre = v[1];
        Concepto.codigo = v[2];
        Concepto.partida = v[3];
        Nom.Concepto.push(Concepto);
    });
    console.log(Nom);
    var ruta = Conn.URL + "nomina/generar";
    CargarAPI(ruta, "POST", Nom, Nom);
}
