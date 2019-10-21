let MD5codigo = "";

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


let opcionesConceptos = {
    ordering: false,
    paging: false,            
    scrollY:        320,
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
        case 'porcentaje_pension':
            $('#txtFormula').val(fn + ' $porcentaje_pension ' );
            break;            
        case 'tiempo_servicio':
            $('#txtFormula').val(fn + ' $tiempo_servicio ' );
            break;
        case 'hijos':
            $('#txtFormula').val(fn + ' $numero_hijos ' );
            break;
        case 'calculo':
            $('#txtFormula').val(fn +  ' ( $sueldo_mensual * 3 ) / 100 ' );
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
        case 'bono_recreacional':
            $('#txtFormula').val(fn +  ' $bono_recreacional ' );
            break;
        case 'bono_fin_ano':
            $('#txtFormula').val(fn +  ' $bono_fin_ano ' );
            break;
        case 'pension_integral':
            $('#txtFormula').val(fn +  ' $pension_integral ' );
            break;
        case 'pension_diaria_integral':
            $('#txtFormula').val(fn +  ' $pension_diaria_integral ' );
            break;
        case 'aguinaldo':
            $('#txtFormula').val(fn +  ' $aguinaldo ' );
            break;
        default:
            break;
    }
}


let wLstConceptos = [];
class Concepto {
    constructor(){
        this.codigo = '';
        this.descripcion = '';
        this.formula = '';
        this.tipo = 0;
        this.partida = '';
        this.cuenta = '';
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
        this.cuenta = $("#txtCuentaContable").val();
        this.estatus = parseInt($("#cmbEstatus").val());
        this.componente = $("#cmbComponente").val();
        this.grado = $("#cmbGrado").val();
        return this;
    }
    Crear(req){    
          
        $("#_cargandol").show();
        var tabla = `
        <table id="tblConcepto" class="ui celled table table-bordered table-striped dataTable" >
            <thead>
                <tr role="row">
                    <th>#</th>
                    <th>PARTIDA</th>
                    <th>CODIGO</th>                                            
                    <th>DESCRIPCION</th>                   
                </tr>
            </thead>
        </table>`;
        $("#_TblConceptos").html(tabla);        
        var t = $('#tblConcepto').DataTable(opcionesConceptos);
        t.clear().draw();
        wLstConceptos = req;
        if(req == null) {
            
        }else{
            var i = 0;
            req.forEach( v => {           
                i++;
                t.row.add([
                    i,
                    v.partida,
                    v.codigo,
                    v.descripcion
                ]).draw(false);
            });
        }

        $("#_cargandol").hide();
        $('#tblConcepto tbody').on('dblclick', 'tr', function () {
            var data = t.row(this).data();
            var pos = data[0] - 1;
            var conc = wLstConceptos[pos];
            $("#txtCode").val(pos);
            $("#txtCodigo").val(conc.codigo);
            $("#txtDescripcion").val(conc.descripcion);
            $("#txtFormula").val(conc.formula);
            $("#cmbTipo").val(conc.tipo);
            $("#txtPresupuesto").val(conc.partida);
            $("#txtCuentaContable").val(conc.cuenta);
            $("#cmbEstatus").val(conc.estatus);
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
  var url = Conn.URL + "nomina/listar/concepto/";
  
  CargarAPI(url, "GET", Obj, Obj);
  
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
                    <th style="text-align:center;"><button style="border: none; background: transparent; font-size: 14px;" id="MytblConcepto">
                    <i class="fa fa-check-square"></i>  
                    </button></th>
                    <th>CODIGO</th>                                            
                    <th>DESCRIPCION</th>                   
                    <th>PARTIDA</th>
                    <th>TIPO </th>
                    <th>CUENTA</th>
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
            '40701010101',
            'DIR-SB',
            ''
        ]).draw(false);        
        dibujarTabla(tblP, fnx, 'DIR-PR');
        tblP.row.add([
            '',
            'sueldo_mensual',
            'PENSION',
            '40701010101',
            'DIR-SM',
            ''
        ]).draw(false);
        dibujarTabla(tblP, fnxc, 'DIR-LEY');
        
        selccionarConceptos(tblP);


        $('#MytblConcepto').click(function() {
            if (tblP.rows({
                    selected: true
                }).count() > 0) {
                tblP.rows().deselect();
                return;
            }
    
            tblP.rows().select();
        });
    
        tblP.on('select deselect', function(e, dt, type, indexes) {
            if (type === 'row') {
                // We may use dt instead of tblP to have the freshest data.
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
        tblP.column(5).visible(false);
    }
}

function dibujarTabla( tblP, fnx, concepto ) {    
    for (const prop in fnx){  
        var partida =  fnx[prop].part == undefined? '':  fnx[prop].part;        
        var abv =  fnx[prop].abv == undefined? 'DIRECTIVA PRIMAS':  fnx[prop].abv;
        var codigo = fnx[prop].rs == undefined? '':  fnx[prop].rs;    
        var cuenta = fnx[prop].cuen == undefined? '':  fnx[prop].cuen;
        if( concepto == 'DIR-LEY'  ){            
            if( fnx[prop].tipo != 0 ){
                tblP.row.add( [ '', fnx[prop].rs, abv, partida, 'DIR-CONC', cuenta ] ).draw(false);
            }else{
                tblP.row.add( [ '', fnx[prop].rs, abv, partida, concepto, cuenta ] ).draw(false);
            }
        }else {
            tblP.row.add( [ '', fnx[prop].rs, abv, partida, concepto, cuenta ] ).draw(false);
        }
    
    }; 
}

function selccionarConceptos(tblP){
    var cant = parseInt(tblP.rows()[0].length);
    if($("#cmbTipoX").val() == "PG" || $("#cmbTipoNomina").val() == 7  || $("#cmbTipoNomina").val() == 8 ){
        for(i=0; i<cant; i++){
            var valor = tblP.rows(i).data()[0][2];
            if ( valor == 'PENSION' ){
                tblP.row(i).select();
            }
        }
    }else{
        for(i=0; i<cant; i++){
            var valor = tblP.rows(i).data()[0][4];
            if ( valor == 'DIR-SB' || valor == 'DIR-SM' || valor == 'DIR-PR'  ||  valor == 'DIR-LEY' ){
                tblP.row(i).select();
            }
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
    var id  = $("#directiva").val();
    var directiva = $("#directiva option:selected").text();
    var nombre = $("#cmbTipoNomina option:selected").text();
    var tipo = $("#cmbTipoX option:selected").val();
    var fechainicio = $("#fechainicio").val();
    var fechafin = $("#fechavigencia").val();
    var fecha = new Date();
    var codigo = id + directiva + nombre + tipo + fechainicio + fechafin + fecha;
    MD5codigo = MD5(codigo);

    CargarAPI(url, "GET", "", Obj);
    myStepper.next();
}

function PrepararNominaView( tipo, des ){
    
    var Tbls = $('#tblNomina').DataTable();
    var t = Tbls.rows().data();
    let estatus = false;
    
    $.each(t, function(c, v){
        if ( v[4] == tipo && v[9] != 'Cerrada' ){
            estatus = true;
        }

    });

    if( parseInt($("#"+ tipo).html()) == 0){
        alertNotify('No existen registros para efectuar cálculos', 'danger');
        return false;
    }

    if (estatus == true){
        alertNotify('Ya existe una prenomina, debe cerrarla o rechazarla para efectuar otro cálculo.', 'warning');
        return false;
    }
    $("#_TblConceptos").html("");
    var Dir = new Directiva();
    $("#cmbTipoX").html(`<option value="${tipo}">${des}</option>`);
    
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
        this.cuenta = '';
        this.formula = '';
    }

}

class WNomina {
    constructor(){
        this.id = '';

        this.nombre = '';
        this.tipo = '';
        this.directiva = '';
        this.fechainicio = '';
        this.fechafin = '';
        this.mes = '';
        this.Concepto = [];
    }

    Crear(req){
        waitingDialog.hide();
        alertNotify('Proceso exitoso', 'success');
        
        $("#_nominalista").html(`
            
            Total de Asignacion: ${req.asignacion}<br> 
            Total de Deducciones: ${req.deduccion}<br>
            Total Neto a pagar: ${req.neto}<br> <br>
            <h4>
            Total de activos: ${req.total}<br>
            
            Pensionados a cobrar: ${req.operados}<br>
            Pensionados sin pago: ${req.sinpagos}<br>
            Incidencias: ${req.incidencias}<br>
            Paralizados: ${req.paralizados}<br>
            Total de registros procesados: ${req.registros}<br>
            </h4><br><br>
            Codigo Hash de seguridad: ${req.md5}<br>
        `);

        $("#mdlNominaLista").modal("show");
        

    }

}
function GenerarNomina(){
    var Nom = new WNomina();
    
    var Tbls = $('#tblConcepto').DataTable();
    var t = Tbls.rows('.selected').data();
    Nom.id  = $("#directiva").val();
    Nom.directiva = $("#directiva option:selected").text();
    Nom.nombre = $("#cmbTipoNomina option:selected").text();
    Nom.tipo = $("#cmbTipoX option:selected").val();
    Nom.fechainicio = $("#fechainicio").val();
    Nom.fechafin = $("#fechavigencia").val();
    Nom.mes = $("#cmbMes option:selected").text();
    Nom.codigo = MD5codigo;
    $.each(t, function(c, v){
        var Concepto = new WConcepto();
        Concepto.codigo = v[1];
        Concepto.nombre = v[2];
        Concepto.partida = v[3];
        Concepto.cuenta = v[5];
        Nom.Concepto.push(Concepto);
    });
    
    //console.log(Nom);
    var ruta = Conn.URL + "nomina/generar";
    $('#mdlPrepararNomina').modal('hide');
    waitingDialog.show('Creando nómina por favor espere...');
    CargarAPI(ruta, "POST", Nom, Nom);
}

function AceptarNomina(){
    ListarNominasPendientes();
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

    

    var f = $("#fechainicio").val();
    $("#txtFileID").val(MD5codigo + "|" + f);

    var formData = new FormData(document.forms.namedItem("forma"));


    var strUrl = "https://" + Conn.IP + Conn.PuertoSSL +  "/ipsfa/api/militar/jwtsubirarchivostxt";
    $("#divDtArchivosL").show();
    $("#divDtArchivos").hide();
    $("#divForma").hide();
    $("#btnAnteriorArchivos").hide();
    $("#btnContinuarArchivos").hide();
    $.ajax({
        url: strUrl,
        type: "post",
        dataType: "html",
        data: formData,
        timeout: 2000000,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", 'Bearer '+ sessionStorage.getItem('ipsfaToken'));
        }
    })
    .done(function (res) {
        $("#divDtArchivosL").hide();
        $("#divForma").hide();
        $("#divDtArchivos").show();
        $('#forma').trigger("reset");
        $("#btnAnteriorArchivos").show();
        $("#btnContinuarArchivos").show();
        
    }).fail(function (jqXHR, textStatus) {        
        $("#divForma").show();
        $("#divDtArchivos").hide();
        $("#divDtArchivosL").hide();
        $("#btnAnteriorArchivos").show();
        $("#btnContinuarArchivos").show();
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
            <th>ACCIONES GENERALES</th>
            <th>DESCRIPCIÓN</th>
            <th>DESDE</th>
            <th>HASTA</th>
            <th>TIPO</th>
            <th>CANTIDAD</th>
            <th>ASIGNACIÓN</th>
            <th>DEDUCCIÓN</th>
            <th>MONTO</th>
            <th>EJECUCIÓN</th>
            <th>ID</th>
            <th>NOMBRE</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
        </table>`;
    return html;
 }


class WListarNomina{
    constructor(){}
    Crear(req){
        $("#_tblNomina").html(NominaPreviewHTML());
        var t = $('#tblNomina').DataTable(tablaBasica);
        t.clear().draw();        
        req.forEach(e => {
            var botones = `<div class="btn-group">
                    <button type="button" onclick = "verPartida('${e.oid}');" class="btn btn-primary btn-flat"
                    data-toggle="tooltip" data-placement="top" title="Resumén Presupuestario"><i class="fa fa-book"></i></button>
                    <button type="button" onclick = "downloadP('${e.url}tmp/${e.nomb}.csv');" class="btn btn-success btn-flat
                    data-toggle="tooltip" data-placement="top" title="Descargar CSV "><i class="fa fa-download"></i></button>
                    <button type="button" onclick = "downloadP('${e.url}tmp/${e.nomb}-ERR.csv');" class="btn btn-warning btn-flat
                    data-toggle="tooltip" data-placement="top" title="Incidencias"><i class="fa fa-file-text-o"></i></button>
                    <button style="display:none" type="button" onclick = "CoeficienteVariacion(${e.oid})" class="btn bg-purple btn-flat"
                    data2-toggle="tooltip" data-placement="top" title="Coeficiente de Variación">
                    <i class="fa fa-area-chart"></i></button>
                </div>`;
            var btnAcc = seleccionarCaso(e);
            

            t.row.add([
                botones,
                e.obse,
                e.desd.substr(0, 10),
                e.hast.substr(0, 10),
                e.tipo,
                e.cant,
                numeral(parseFloat(e.asig,2)).format('0,0.00'),
                numeral(parseFloat(e.dedu)).format('0,0.00'),
                numeral(parseFloat(e.mont)).format('0,0.00'),
                btnAcc,
                e.oid,
                e.nomb
            ]).draw(false);
           
        });
        t.column(10).visible(false);
        t.column(11).visible(false);
        verificarPrivilegioUsuario();
    }

}

function ListarNominasPendientes(){
    var lst = new WListarNomina();
    var ruta =  Conn.URL + "nomina/listarpendientes/S/1";
    CargarAPI(ruta, "GET", lst, lst);
}

function seleccionarCaso(e){
    var btnAcc = "";
    switch (parseInt(e.esta)) {
        case 1:
            btnAcc = `<div class="btn-group">
            <button type="button" onclick = "cerrarNomina(${e.oid}, 97)" class="btn btn-danger btn-flat"
            data-toggle="tooltip" data-placement="top" title="Rechazar">
            <i class="fa fa-times-circle"></i></button>
            <button type="button" onclick = "cerrarNomina(${e.oid}, 2)" class="btn btn-success btn-flat"
            data-toggle="tooltip" data-placement="top" title="Cerrar nómina"><i class="fa fa-check-square-o"></i></button>`;
            break;
        case 2:
            btnAcc = "CERRADA";
            
            break;
        case 3:
            btnAcc = "APROBADA";
            break;
        case 4: 
            btnAcc = "PAGADA";
            break;
        default:
            break;
    }
    
    return btnAcc;
}

class WVerPartida{
    constructor(){}
    Crear(req){
        $("#_mdlresumen").html(VerPartidaHTML());
		var tblC = $('#tblResumen').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': true,
            'ordering': false,
            'info': false,
            'autoWidth': false
        });
        $("#mdlResumenPresupuestario").modal("show");
        
		for(var i=0; i < req.length; i++){
            var obj = req[i];
			tblC.row.add([obj.part, obj.conc, obj.mont]).draw(false);
		}
       
    }
}
function verPartida(oid){
    var lst = new WVerPartida();
    var ruta =  Conn.URL + "nomina/verpartida/" + oid;
    CargarAPI(ruta, "GET", lst, lst);
}

function VerPartidaHTML(){
    var html = `<table class="ui celled table " cellspacing="0" width="100%" id="tblResumen" >
        <thead>
        <tr>
        <th>PARTIDA</th>
        <th>CONCEPTOS</th>
        <th>MONTO</th>    
        </tr>
        </thead >
        <tbody>
        </tbody>
    </table>`;
    return html;
 
}

//Botones para aprobar o cerrar nominas así como rechazarlas
class WCerrarNomina{
    constructor(){}
    Crear(req){
        ListarNominasPendientes();
    }
}

function cerrarNomina(oid, estatus){
    var concepto = "rechazar los archivos y no comprometer ";
    if( estatus < 97){
        concepto = "cerrar para comprometer los pagos de ";
    }
    $("#_contenido").html(`¿Está seguro que desea ${concepto} la nómina?`);
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" 
    onclick="ejecutarOperacion(${oid}, ${estatus})">Si</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function ejecutarOperacion(oid, estatus){
    var cerrar = new WCerrarNomina();
    var ruta =  Conn.URL + "nomina/cerrar/" + oid + "/" + estatus;
    CargarAPI(ruta, "GET", cerrar, cerrar);
}

function downloadP(url){
    window.open(url, 'Download');
}

class WContar{
    constructor(){

    }
    Crear(req){
        console.log(req);
        req.act.forEach(e => {
            var contenido = 'Activos: <b>' + e.cantidad;
            $("#" + e.situacion).html(contenido);
                        
        });
        req.par.forEach(e => {
            var contenido = 'Paralizado: <b>' + e.cantidad;
            $("#" + e.situacion + "I").html(contenido);
                      
        });
        ListarNominasPendientes();
    }
}

function ContarPensionados(){
    var crear = new WContar();
    var ruta =  Conn.URL + "nomina/ccpensionados";
    CargarAPI(ruta, "GET", crear, crear);
}

function rechazarNomina(){    
    $("#_contenido").html(`¿Está seguro que desea rechazar todas las nóminas? Está opción elimna 
    los archivos relacionados con el proceso de pago.`);
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" 
    onclick="ejecutarRechazo(99)">Si</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');    
}

function ejecutarRechazo(){
    var cerrar = new WCerrarNomina();
    var ruta = Conn.URL + "nomina/procesar" ;
    var lst = cargarProcesarNomina(99);

    CargarAPI(ruta, "POST", lst[1], cerrar);
}

function aprobarNomina(){
    var lst = cargarProcesarNomina(3);

    if(lst[0] == false){
        alertNotify("Todos los procesos de nomina deben estar en el estatus de CERRADO para continuar", "danger");
        return false;
    }
    $("#_contenido").html(`¿Está seguro que desea aprobar la nómina? Recuerde tener presente que está acción 
    genera compromisos de pago`);
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" 
    onclick="ejecutarAprobacion()">Si</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
    
    
}

class WProcesarNomina{
    constructor(){}
    Crear(req){
        $("#_cargando").hide();
        alertNotify("Se han registrado los pagos", "success");
        ListarNominasPendientes();
    }
}

function ejecutarAprobacion(){
    var lst = cargarProcesarNomina(3);

    if(lst[0] == false){
        alertNotify("Todos los procesos de nomina deben estar en el estatus de CERRADO para continuar", "danger");
        return false;
    }
    var wprocesar = new WProcesarNomina();
    $("#_cargando").show();
    var ruta =  Conn.URL + "nomina/procesar";
    CargarAPI(ruta, "POST", lst[1], wprocesar);
}

function cargarProcesarNomina(esta){
    var Tbls = $('#tblNomina').DataTable();
    var t = Tbls.rows().data();
    let estatus = true;
    var lst = [];
    $.each(t, function(c, v){
        if(v[9] != "CERRADA"){
            estatus = false;
        }
        var pos = { id: parseInt(v[10]), estatus: parseInt(esta), nombre: v[11]};
        lst.push(pos);
    });
    return [estatus, lst];
}

function alertNotify (msj, color){
    $.notify(
        {
            title: '<strong>Proceso de Nómina!</strong>',
            message: msj
        },
        {
            type: color
        } 
    );
}


