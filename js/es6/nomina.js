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

let opcionesDire = {
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
};


let intFila = 0;


function fnxC(fnxc){
    var fn = $('#txtFormula').val();
    switch (fnxc) {
        case 'sueldo_basico':
            $('#txtFormula').val(fn + ' $sueldo_basico ' );
            break;
        case 'tiempo_servicio':
            $('#txtFormula').val(fn + ' $tiempo_servicio ' );
            break;
        case 'hijos':
            $('#txtFormula').val(fn + ' $numero_hijos ' );
            break;
        case 'calculo':
            $('#txtFormula').val(fn +  ' ( $sueldo_base * 3 ) / 100 ' );
            break;
        case 'componente':
            $('#txtFormula').val(fn +  ' $componente ' );
            break;
        case 'grado':
            $('#txtFormula').val(fn +  ' $grado ' );
            break;
        case 'sueldo_minimo':
            $('#txtFormula').val(fn +  ' $sueldo_minimo ' );
            break;
        case 'sueldo_mensual':
            $('#txtFormula').val(fn +  ' $sueldo_mensual ' );
            break;
        case 'unidad_tributaria':
            $('#txtFormula').val(fn +  ' $unidad_triburaria ' );
            break;
        case 'total_primas':
            $('#txtFormula').val(fn +  ' $total_primas ' );
            break;
        case 'porcentaje_profesionalizacion':
            $('#txtFormula').val(fn +  ' $porcentaje_profesionalizacion ' );
            break;            
        default:
            break;
    }
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
        this.codigo = $("#txtCodigo").val().toUpperCase();
        this.descripcion = $("#txtDescripcion").val().toUpperCase();
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
        <table id="tblConcepto" class="ui celled table table-bordered table-striped dataTable" >
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
        $('#_TblConceptos tbody').on('dblclick', 'tr', function () {
            var data = t.row(this).data();
            alert(data);
        });
    }
    

}
function consultarConcepto(){

    return false;
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
    $("#txtFormula").val('');
    $("#txtPresupuesto").val('');
    $("#cmbEstatus").val('')
    $.notify("Envio de datos correctos...");
    $("#_cargando").hide();
    
}

function PrepararConceptos(){ 
  var Obj = new Concepto();
  var url = Conn.URL + "nomina/concepto/listar";
  CargarAPI(url, "GET", "", Obj);
  
}

function ActivarFechaNomina(){
    $('#fechainicio').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#fechavigencia').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
}

class DirCon {

    Crear(DATA){        
        let fnx  = DATA.fnx;
        let fnxc = DATA.fnxC;
        //console.log(fnxc);
        var tabla = `
        <table id="tblConcepto" class="ui celled table table-bordered table-striped dataTable">
            <thead>
                <tr>
                    <th></th>
                    <th>CODIGO</th>                                            
                    <th>DESCRIPCION</th>                   
                    <th>PARTIDA </th>
                    <th>TIPO </th>
                </tr>
            </thead>
        </table>`;
        $("#_TblConceptos").html(tabla);        
        var tblP = $('#tblConcepto').DataTable(opcionesDire);
        tblP.clear().draw();
        tblP.row.add([
            '',
            'sueldo_base',
            'SUELDO BASE',
            '4.01.00.00',
            'DIR-SB'
        ]).draw(false);        
        dibujarTabla(tblP, fnx, 'DIR-PR');
        tblP.row.add([
            '',
            'sueldo_mensual',
            'SUELDO MENSUAL',
            '4.01.00.00',
            'DIR-SM'
        ]).draw(false);
        dibujarTabla(tblP, fnxc, 'DIR-LEY');
        
        selccionarConceptos(tblP);
    }
}

function dibujarTabla(tblP, fnx, concepto) {    
    for (const prop in fnx){  
        var partida =  fnx[prop].part == undefined? '':  fnx[prop].part;        
        var abv =  fnx[prop].abv == undefined? 'DIRECTIVA PRIMAS':  fnx[prop].abv;        
        tblP.row.add([
            '',
            fnx[prop].rs,
            abv,
            partida,
            concepto
        ]).draw(false);
    }; 
}

function selccionarConceptos(tblP){
    var cant = parseInt(tblP.rows()[0].length);
    for(i=0; i<cant; i++){
        var valor = tblP.rows(i).data()[0][4];
        if ( valor == 'DIR-SB' || valor == 'DIR-SM' || valor == 'DIR-PR'  ||  valor == 'DIR-LEY' ){
            tblP.row(i).select();
        }
    }
}

function CargarDirectivaConceptos(){
    var Obj = new DirCon();
    var url = Conn.URL + "nomina/directiva/detalle/" + $("#directiva").val();
    if($("#fechainicio").val() == "" || $("#fechavigencia").val() == "" ){
        alert("Debe seleccionar una fecha para la nómina");
        return false;
    }
    CargarAPI(url, "GET", "", Obj);
    myStepper.next();
}

function PrepararNominaView(des){
    $("#_TblConceptos").html("");
    var Dir = new Directiva();
    $("#cmbTipoX").html(`<option value="RCP">${des}</option>`);

    var ruta = Conn.URL + "nomina/directiva";
    CargarAPI(ruta, "GET", "", Dir);
    myStepper = new Stepper(document.querySelector('#stepper-nomina'));
    $('#mdlPrepararNomina').modal('show');

    var Obj = new ListaConceptos();
    var url = Conn.URL + "nomina/concepto/listar";
    CargarAPI(url, "GET", "", Obj);
    ActivarFechaNomina();
    ViewInputFile();
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

        this.Nombre = '';
        this.Tipo = '';
        this.directiva = '';
        this.fechainicio = '';
        this.fechafin = '';
        this.Concepto = [];
    }

    Crear(req){
        waitingDialog.hide();
        $.notify(
            {
                title: '<strong>Proceso de Nómina!</strong>',
                message: 'finalizo con <strong>éxito</strong>'
            },
            {
                type: 'success'
            } 
        );
        
        $("#_nominalista").html(`
            Codigo Hash: ${req.md5}<br>
            Total de Asignacion: ${req.asignacion}<br> 
            Total de Deducciones: ${req.deduccion}<br>
            Total Neto a pagar: ${req.neto}<br> 
            Registros: ${req.registros}<br>
            Paralizados: ${req.paralizados}<br>
            Descargar nómina .csv: <a href="${req.archivo}" target="_top" >Descargar Nómina</a>
            <br><br>
        `);

        $("#mdlNominaLista").modal("show");
        var t = $('#tblNomina').DataTable();
        t.row.add([
            req.oid,
            req.md5,
            req.desde,
            req.hasta,
            'RCP',
            req.registros,
            req.asignacion,
            req.deduccion,
            req.neto,
            '<a href="${req.archivo}" target="_top" >Descargar Nómina</a>'
        ]).draw(false);

    }

}
function GenerarNomina(){
    var Nom = new WNomina();
    
    var Tbls = $('#tblConcepto').DataTable();
    var t = Tbls.rows('.selected').data();
    Nom.id  = $("#directiva").val();
    Nom.directiva = $("#directiva option:selected").text();
    Nom.Nombre = $("#cmbTipoNomina option:selected").text();
    Nom.Tipo = $("#cmbTipoX option:selected").val();
    Nom.fechainicio = $("#fechainicio").val();
    Nom.fechafin = $("#fechavigencia").val();
    $.each(t, function(c, v){
        var Concepto = new WConcepto();
        Concepto.codigo = v[1];
        Concepto.nombre = v[2];
        Concepto.partida = v[3];
        Nom.Concepto.push(Concepto);
    });
    var ruta = Conn.URL + "nomina/generar";
    $('#mdlPrepararNomina').modal('hide');
    console.log(Nom);
    waitingDialog.show('Creando nómina por favor espere...');
    CargarAPI(ruta, "POST", Nom, Nom);
}

function AceptarNomina(){
    $("#mdlNominaLista").modal("hide");
}

function DetalleNomina(){
    var Tbls = $('#tblConcepto').DataTable();
    var t = Tbls.rows('.selected').data();
    var asignacion = '<ul>';
    var deduccion = '<ul>';
    $.each(t, function(c, v){
        if(v[4] == "DIR-SB" || v[4] == "DIR-SM" || v[4] == "DIR-PR"){
            asignacion += `<li>${v[1]} - ${v[2]}</li>`;
        }else{
            deduccion += `<li>${v[1]} - ${v[2]}</li>`;
        }
    });
    asignacion += '</ul>';
    deduccion += '</ul>';

    $("#_TblDetalle").html(`
        <center>${$("#directiva option:selected").text()}<BR>
        DESDE ${$("#fechainicio").val()} HASTA ${$("#fechainicio").val()}</center><br><br>
        <table style="width:100%">
        <tr><td style="width:50%" valign="top" >${asignacion}</td><td  valign="top">${deduccion}</td></tr>
        </table>
    `);
}


function ViewInputFile(){
    $("#input-folder-2").fileinput({
        browseLabel: 'Seleccionar Archivos',
        previewFileIcon: '<i class="fa fa-file"></i>',
        language: 'es',
        theme: "fa",
        hideThumbnailContent: true,
        allowedPreviewTypes: null, // set to empty, null or false to disable preview for all types
        previewFileIconSettings: {
            'doc': '<i class="fas fa-file-word text-primary"></i>',
            'xls': '<i class="fas fa-file-excel text-success"></i>',
            'ppt': '<i class="fas fa-file-powerpoint text-danger"></i>',
            'jpg': '<i class="fas fa-file-image text-warning"></i>',
            'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
            'zip': '<i class="fas fa-file-archive text-muted"></i>',
            'htm': '<i class="fas fa-file-code text-info"></i>',
            'txt': '<i class="fa fa-search text-info"></i>',
            'mov': '<i class="fas fa-file-video text-warning"></i>',
            'mp3': '<i class="fas fa-file-audio text-warning"></i>',
        },
        previewFileExtSettings: {
            'doc': function(ext) {
                return ext.match(/(doc|docx)$/i);
            },
            'xls': function(ext) {
                return ext.match(/(xls|xlsx)$/i);
            },
            'ppt': function(ext) {
                return ext.match(/(ppt|pptx)$/i);
            },
            'jpg': function(ext) {
                return ext.match(/(jp?g|png|gif|bmp)$/i);
            },
            'zip': function(ext) {
                return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
            },
            'htm': function(ext) {
                return ext.match(/(php|js|css|htm|html)$/i);
            },
            'txt': function(ext) {
                return ext.match(/(txt|ini|md)$/i);
            },
            'mov': function(ext) {
                return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
            },
            'mp3': function(ext) {
                return ext.match(/(mp3|wav)$/i);
            },
        }
      });
      
      $( "#forma" ).submit(function( event ) {
          
        EnviarArchivos();
        event.preventDefault();
      });
}

/**
 * Enviando Archivos
 */
function EnviarArchivos() {
    if ($("#input-folder-2").val() == "") {
        $.notify("Debe seleccionar un archivo", {position: "top"});
        return false;
    }

    $("#txtFileID").val('000-xc');
    var formData = new FormData(document.forms.namedItem("forma"));


    var strUrl = "https://" + Conn.IP + Conn.PuertoSSL +  "/ipsfa/api/militar/jwtsubirarchivostxt";
    //console.log(strUrl);
    $.ajax({
        url: strUrl,
        type: "post",
        dataType: "html",
        data: formData,
        timeout: 15000,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", 'Bearer '+ sessionStorage.getItem('ipsfaToken'));
        }
    })
    .done(function (res) {
        
        $("#divForma").hide();
        $("#divDtArchivos").show();
        $('#forma').trigger("reset");
        
    }).fail(function (jqXHR, textStatus) {        
        $("#divForma").show();
        $("#divDtArchivos").hide();
        $('#forma').trigger("reset");
        if (textStatus === 'timeout') {
            $.notify("Los archivos exceden el limite en tiempo de conexion intente con menos...");
        }

    });

}

/**
 * HTML TABLE
 */

 function NominaPreviewHTML(){
     
    var html = `<table class="ui celled table" cellspacing="0" width="100%" id="tblNomina" >
        <thead>
        <tr>
            <th>ID</th>
            <th>DESCRIPCION</th>
            <th>DESDE</th>
            <th>HASTA</th>
            <th>TIPO</th>
            <th>CANTIDAD</th>
            <th>ASIGNACION</th>
            <th>DEDUCCION</th>
            <th>MONTO</th>
            <th>#ACC</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
        </table>`;
    return html;
 }

 function ListarNominasPendientes(){
    $("#_tblNomina").html(NominaPreviewHTML());
    var th = $('#tblNomina').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': false,
        'ordering': false,
        'info': false,
        //'autoWidth'   : false
        'autoWidth': false
    });

    th.clear().draw();


 }

class WContar{
    constructor(){

    }
    Crear(req){
        req.forEach(e => {
            $("#" + e.situacion).html(e.cantidad)             
        });
        ListarNominasPendientes();
    }
    Obtener(){

    }
}

 function ContarPensionados(){
     var crear = new WContar();
     var ruta =  Conn.URL + "nomina/ccpensionados";
     CargarAPI(ruta, "GET", crear, crear);
 }