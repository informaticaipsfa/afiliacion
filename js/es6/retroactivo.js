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
    CalculosRetroactivos = [];
    $("#btnDisplay").hide();
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


let CalculosRetroactivos = [];
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

        limpiarConceptosR();
        // console.info( JSON.parse( req.js ) );
        var arr = $("#cmbMesActivo").val().split("|", -1);
        var rs = JSON.parse( req.js );
        CalculosRetroactivos.push( { 
            'mes': arr[1].trim(),
            'valor': rs.conceptos,
            'asignacion': parseFloat(rs.asignaciones),
            'deduccion': parseFloat(rs.deducciones)
        } );

        var prc = calcularConceptosR();
        
        $("#txtDetalles").html(`<p style="text-align: left;">            
            Total de Asignacion: ${ numeral(parseFloat(prc.asignacion,2)).format('0,0.00')  }<br> 
            Total de Deducciones: ${  numeral(parseFloat(prc.deduccion,2)).format('0,0.00') }<br><br>
            Total de meses procesados: ${prc.cantidad}<br><br>
            <h3 style="text-align: left;">
            Total Neto a pagar: ${  numeral(parseFloat(prc.neto,2)).format('0,0.00') }&nbsp;&nbsp;<br> <br>
            </h3>
            </p>
           
        `);

        $("#btnDisplay").show();
        //$("#mdlNominaLista").modal("show");
        

    }
    Obtener(){
        return this;
    }
}
function calcularConceptosR(){
    var i = 0;
    var totalA = 0;
    var totalD = 0;
    CalculosRetroactivos.forEach(e => {
        totalA += e.asignacion;
        totalD += e.deduccion;
        i++;
    });
    return {
        "asignacion": totalA,
        "deduccion": totalD,
        "neto": totalA - totalD,
        "cantidad": i
    };
     
}
function validarConceptosR(){
    var resp = false;
    var arr = $("#cmbMesActivo").val().split("|", -1);
    CalculosRetroactivos.forEach(e => {
        if (e.mes == arr[1].trim()){
            resp = true;
        }
    });
    return resp;
}

function limpiarConceptosR(){
    $("#_TblConceptos").html(TableHtmlRectroactivo());        
    var t = $('#tblConcepto').DataTable(opcionesRetroactivo);
    t.clear().draw();
    $("#btnAsociar").hide();
}


function operarRetroactivos(){
    if (validarConceptosR() == true){
        alertNotify('Este calculo ya se ha procesado intente otro mes...', 'success');
        limpiarConceptosR();
        return false;
    }
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
        waitingDialog.show('Calculado retroactivo por favor espere...');
        CargarAPI(ruta, "POST", Nom, Nom);
    }else{
        alertNotify('El pago ya fue procesado...', 'warning');
        waitingDialog.hide();
        return false;
    }
}

function registrarRetroactivos(){
    $("#_contenido").html("Esta seguro que desea registrar el siguiente pago en la nómina del mes próximo");
    $("#_botonesmsj").html(`
        <button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar" onClick="registrarEnNomina()">Aceptar</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" id="_cancelar" onClick="cancelarEnNomina()">Cancelar</button>
    `);
    $("#modMsj").modal("show");
    return false;
}

function registrarEnNomina(){
    $("#modMsj").modal("hide");
}
function cancelarEnNomina(){
    $("#modMsj").modal("hide");
}

function imprimirRetroactivo(){
    var e = sessionStorage.getItem("ipsfaToken");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;
    

    var ventana = window.open("", "_blank");
    // style="background: url('../images/fondo.png') no-repeat center;"
    var grado = $("#txtGradoT").val();
    var nombre = $("#txtNombre").val();
    var cedula = $("#txtcedula").val();
    var fingreso = $('#txtFIngreso').val();
    var fretiro = $('#txtFRetiro').val();
    var fultimo = $('#txtFUAscenso').val();
    var servicio = $('#txtServicioT').val();
    var hijos = $('#txtNumHijos').val();
    var antiguedad = $('#txtAntiguedad').val();
    var porcentaje = $('#txtPension').val();
    var ano = $("#cmbAnoActivo").val();
    var localtime = new Date().toLocaleString();
    var detalle = detalleConceptosR();
    var lst = calcularConceptosR();
    ventana.document.write(`<center>
    <div>
        <table style="width:800px" class="membrete">
            <tr>
                <td width="200px" valign="top"><center><img  style="width: 100px;height: 100px; margin-left: 0px" 
                class="img-responsive file-path-wrapper-pre-view" src="images/logo_ipsfa.png" id="_imgescudo"/></center>
                </td>
                <td width="400px">
                    <center>
                    REPÚBLICA BOLIVARIANA DE VENEZUELA <BR>
                    MINISTERIO DEL PODER POPULAR PARA LA DEFENSA<BR>
                    VICEMINISTERIO DE SERVICIOS, PERSONAL Y LOGÍSTICA<BR>
                    DIRECCIÓN GENERAL DE EMPRESAS Y SERVICIOS<BR>
                    INSTITUTO DE PREVISIÓN SOCIAL DE LA FUERZA ARMADA<BR>
                    RIF: G20003692-3
                    </center>
                </td>
            <td width="200px" valign="top"></td>
            </tr>
        </table >
        <h3>CALCULOS CORRESPONDIENTE PARA EL PAGO DE RETROACTIVO
        </h3>
        
        <table style="width:800px" class="tablaneto">
        <tr>
            <td align="center"><b>GRADO</b><BR>${grado}</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${nombre}</label></td>
            <td align="center"><b>N° DE CEDULA</b><BR><label>${cedula}</label></td>
        </tr>
        <tr>
            <td align="center"><b>FECHA INGRESO</b><BR>${fingreso}</td>
            <td align="center"><b>FECHA RETIRO</b><BR><label id="nombre">${fretiro}</label></td>
            <td align="center"><b>F. ULT. ASCENSO</b><BR><label>${fultimo}</label></td>
            <td align="center"><b>TIEMPO SERVICIO</b><BR><label>${servicio}</label></td>
        </tr>
        <tr>
            <td align="center"><b>ANTIGUEDAD</b><BR>${antiguedad}</td>
            <td align="center"><b>PORCENTAJE</b><BR><label>${porcentaje}</label></td>
            <td align="center"><b>NUMERO HIJOS</b><BR><label>${hijos}</label></td>
            <td align="center"><b>AÑO ACTIVO</b><BR><label>${ano}</label></td>
        </tr>
        <tr>
            <td align="center"></td>
            <td align="center"><b>ASIGNACION</b><BR><label>${accounting.formatMoney(lst.asignacion, "Bs. ", 2, ".", ",")}</label></td>
            <td align="center"><b>DEDUCCION</b><BR><label>${accounting.formatMoney(lst.deduccion, "Bs. ", 2, ".", ",")}</label></td>
            <td align="center"><b>TOTAL A DEPOSITAR</b><BR><label>${accounting.formatMoney(lst.neto, "Bs. ", 2, ".", ",")}</label></td>
        </tr>
        </table>
        <br>
        
    </div><br>
    ${ detalle }
    <br><br>
    <h3>APROBADO POR<BR></h3>
    ${Usuario.nombre} / ${localtime}<br>
    <button id="btnPrint" onClick="javascript:window.print();">Imprimir Reporte</buttton>
    `);


    ventana.document.head.innerHTML = ` <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SSSIFANB</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../css/dataTables.semanticui.min.css">
    <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
    <style type="text/css">
        body{
            font-family: Arial, Calibre;
            font-size: 11px;
        }
        table{
            border-collapse: collapse;
            font-family: Arial, Calibre;
            font-size: 10px;
        }
        .tablaneto {
            border-collapse: collapse;
        } 
        .tablaneto tr{
            border: 1px solid #CCCCCC;
        } 
        .tablaneto td {
            border: 1px solid #CCCCCC;
        } 
        .tablaneto th {
            border: 1px solid #CCCCCC;
        }

        .tablanetos {
            border-collapse: collapse;
            font-family: Arial, Calibre;
            font-size: 11px;
        } 
        .tablanetos tr{
            border: 1px solid #CCCCCC;
        } 
        .tablanetos td {
            border: 1px solid #CCCCCC;
            font-size: 11px;
        } 
        .tablanetos th {
            border: 1px solid #CCCCCC;
            background-color: #CCCCCC;
        } 
        @media print {
            div {
                background-position: 180px;
                background: url('../images/fondo.png') no-repeat center;
            }
        }
    </style>
     `;
}

function detalleConceptosR(){
    var table = '';
    
    var porcentaje = $("#txtPension").val();
    CalculosRetroactivos.forEach(e => {
        var fila = '';
        table += `<H3>DESCRIPCION: PAGO CORRESPONDIENTE AL MES DE ${e.mes}</H3><table class="tablanetos" style="width:800px">
        <thead>
        <tr>
            <th align="center" style="width:350px">CONCEPTO</th>
            <th align="center" style="width:150px">CALCULOS</th>
            <th align="left" style="width:150px">ASIGNACIONES</th>
            <th align="center" style="width:150px">DEDUCCIONES</th>
        </tr>
        </thead>
        <tbody>
        `;
        var asignacion = 0;
        var deduccion = 0;
        e.valor.forEach(x => {
            var monto = parseFloat(x.mont, 2);
            var montostr = accounting.formatMoney(x.mont, "Bs. ", 2, ".", ",");
            var des = x.desc.replace("_", " ").toUpperCase();;
            var tipo = x.tipo;
            if(x.tipo == 97){                 
                //totalAsignacion += monto;
                
                fila += `
                    <tr>
                        <td align="left" style="width:350px">&nbsp;&nbsp;${des}</td>
                        <td align="right" style="width:150px">${montostr}&nbsp;&nbsp;</td>
                        <td align="right" style="width:150px"></td>
                        <td align="right" style="width:150px"></td>
                    </tr>`;
                
            }else{
                if(tipo == 1){ //Asignacion   
                    var sueldomensual = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des); 
                    if( des == "SUELDO MENSUAL" ){
                        sueldomensual = `PENSIÓN MENSUAL ( ${porcentaje} % )`;                    
                    } 
                    fila += `
                        <tr>
                            <td align="left" style="width:350px">&nbsp;&nbsp;${sueldomensual}</td>
                            <td align="right" style="width:150px"></td>
                            <td align="right" style="width:150px">${montostr}&nbsp;&nbsp;</td>
                            <td align="right" style="width:150px"></td>
                        </tr>`;
                    asignacion += monto;
               }else{ //Deduccion
                    var strconceptos = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des);
                    fila += `
                        <tr>
                            <td align="left" style="width:350px">&nbsp;&nbsp;${strconceptos}</td>
                            <td align="right" style="width:150px"></td>
                            <td align="right" style="width:150px"></td>
                            <td align="right" style="width:150px">${montostr}&nbsp;&nbsp;</td>
                        </tr>`;
                    deduccion += monto;
                }
            } // fin del total de asignaciones
            

        });
        var tfoot = `
        <tfoot>
            <tr>
                <th align="left" style="width:350px">TOTALES</th>
                <th  style="width:150px"></th>
                <th align="right" style="width:150px">${accounting.formatMoney(asignacion, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</th>
                <th align="right" style="width:150px">${accounting.formatMoney(deduccion, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</th>
            </tr>
        </tfoot>`;
        table += fila + `</tbody>${tfoot}</table>`;
        
    });
    return table;
}