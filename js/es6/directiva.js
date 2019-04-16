let opcionesWDire = {
    ordering: false,
    paging: false,
    searching: false, 
    scrollY:        480,
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


function PrepararDirectiva(){
    var Dir = new Directiva();
    var ruta = Conn.URL + "nomina/directiva";
    CargarAPI(ruta, "GET", "", Dir);
}

class Directiva {
    constructor(){

    }
    Obtener(){

    }
    Crear(_DATA){
        $("#directiva").html('');
        _DATA.forEach(v => {
            $("#directiva").append(`<option value=${v.id}>${v.numero}</option>`);
        });
    }
}

class ListaConceptos {
    constructor(){

    }
    Crear(DATA){        
        $("#_cargandol").show();
        
    }

}

class WDirectiva{
	constructor(){
		this.id = 0;
        this.nombre = '';
        this.numero = '';
		this.observacion = '';
		this.fechainicio = '';
		this.fechavigencia = '';
        this.unidadtributaria = 0.00;
        this.porcentaje = 0.00;
		this.salariominimo = 0.00;
    }
    Crear(req){
        waitingDialog.hide();
        alertErr('Directiva', 'Proceso exitoso');        
        //PrepararDirectiva();
    }
}

function ClonarShow(){
    ActivarFechaDirectiva();
    var tex = $("#directiva option:selected").text();
    var val = $("#directiva option:selected").val();
    if($("#directiva").val() == "0X"){
        alertErr('Directivas', 'Debe seleccionar una directiva', 'danger');
        return false;
    }
    $("#directiva_aux").html(`<option value=${val}>${tex}</option>`);
	$("#DivClone").modal("show");
}

function ActivarFechaDirectiva(){
    $('#datepicker2').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#datepicker1').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
}

function Clonar(){

    var wDir = new WDirectiva();
    wDir.id = parseInt($("#directiva_aux").val());    
    wDir.nombre = $("#numero").val().toUpperCase();
    wDir.numero = $("#numero").val().toUpperCase();
	wDir.observacion = $("#observacion").val().toUpperCase();
    wDir.fechainicio = new Date(Util.ConvertirFechaUnix($("#datepicker2").val())).toISOString();  
    wDir.fechavigencia = new Date(Util.ConvertirFechaUnix($("#datepicker1").val())).toISOString();0
	wDir.unidadtributaria = $("#unidadtributaria").val()==""?0:parseFloat($("#unidadtributaria").val());
	wDir.porcentaje = $("#porcentaje").val()==""?0:parseFloat($("#porcentaje").val());
	wDir.salariominimo = $("#salario").val()==""?0:parseFloat($("#salario").val());    
    if(wDir.salariominimo <= 0){
        //alertErr('Directivas', 'Debe cargar un salario minimo', 'danger');
        alert('El salario minimo debe ser mayor a cero');
        return;
    }else if(wDir.unidadtributaria <= 0){
        //alertErr('Directivas', 'Debe cargar la unidad tributaria', 'danger');
        alert('La unidad tributaria debe ser mayor a cero');
        return;
    }else{
        ruta = Conn.URL + "nomina/directiva/clonar";
        $("#DivClone").modal("hide");
        waitingDialog.show('Creando directiva por favor espere...');
        CargarAPI(ruta, "POST", wDir, wDir);
    }

	
}

function ConsultarDirectiva(){

}

function CancelarDirectiva(){

}
let fnx = [];
let tblP;
class WListarDirectiva{
    constructor(){}
    Crear(req){               
        $("#frmDirectiva").show();
        $("#tablulador").html( HTMLtabulador());        
        tblP = $('#reportedirectiva').DataTable(opcionesWDire);
        tblP.clear().draw();
        $("#salariom").val(req.salario);
        $("#unidadtributariam").val(req.ut);
        $("#f_ini").val(req.f_ini);
        $("#f_ven").val(req.f_ven);
        
        
        req.sueldo.forEach( v => {            
            tblP.row.add([
                v.id,
                v.gr,
                v.an,
                `<div class="input-group"><input onkeypress="return Util.SoloNumero(event,this)" 
                onblur="calcularMonto(this, ${v.id})" class="form-control" style="heigth:20px; 
                width:100%;padding:0px;padding-left:5px" type="text" id="row-1-${v.id}" value="${v.ft}"></input></div>`,
                `<div class="input-group"><input onkeypress="return Util.SoloNumero(event,this)" 
                onblur="" class="form-control" style="heigth:20px; width:100%;padding:0px;padding-left:5px" 
                type="text" id="row-2-${v.id}" value="${v.sb}"></input></div>`
            ]).draw(false);
        });
        tblP.column(0).visible(false);
        $("#primaid").html(`<option value='0'>Seleccionar Prima</option>`);
        
        //console.log(req.fnx);
        var i = 0;
        fnx = req.fnx;
        req.fnx.forEach( v => {
            $("#primaid").append(`<option value='${i}'>${v.rs}</option>`);
            i++;
        })
        $("#primaid").append(`<option value='99'>Otra...</option>`);
        $("#_cargando").hide();
        
    }
}


class WActualizarPrima{
    constructor(){
        this.id = '';
        this.descripcion = '';
        this.formula = '';
    }
    Crear(req){
        $("#_cargandoo").hide(); 
        alertErr('Actualizar Primas', 'Proceso exitoso', 'success' );

    }
    Obtener(){
        
    }
}
function ActualizarPrima(){
    $("#_cargandoo").show();
    var WPrima = new WActualizarPrima();
    WPrima.id = $("#oidprima").val();
    WPrima.descripcion = $("#prima_nombre").val();
    WPrima.formula = $("#txtFormula").val();
    var ruta = Conn.URL + "nomina/directiva/prima";
    CargarAPI(ruta, "POST", WPrima, WPrima);
}

function SeleccionarPrima(){
    var pos = parseInt($("#primaid option:selected").val());
    $("#prima_nombre").val(fnx[pos].rs);
    $("#txtFormula").val(fnx[pos].fn);
    $("#oidprima").val(fnx[pos].oid);
    $("#partida").val(fnx[pos].part);

}

function ListarDirectivaDetalle(){
    var tex = $("#directiva option:selected").text();
    var val = $("#directiva option:selected").val();
    $("#frmDirectiva").hide();
    if($("#directiva").val() == "0X"){
        alertErr('Directivas', 'Debe seleccionar una directiva');
        return false;
    }
    $("#_cargando").show();
    var WDir = new WListarDirectiva();
    var ruta = Conn.URL + "nomina/directiva/listar/" + val;
    CargarAPI(ruta, "GET", "", WDir);
}

class WActualizarDirectiva{
    constructor(){
        this.id = '';
        this.factor = 0.00;
        this.monto = 0.00;
    }
    Crear(req){
        console.log(req);
    }
}
class WDActualizar{
    constructor(){
        this.id = '';
        this.directivas = [];
    }
    Crear(req){
        $("#_cargandoo").hide();
        alertErr('Directiva','Se ha logrado actualizar la directiva', 'success');
    }
    Obtener(){

    }
}
function ActualizarDirectiva(){
    var wAct = new WDActualizar();
    wAct.id = $("#directiva").val();
    var cant = tblP.rows().data().length;
    $("#_cargandoo").show();
    for(i=0; i < cant; i++){
        var wDire = new WActualizarDirectiva();
        wDire.id = tblP.row(i).data()[0];
        wDire.factor = parseFloat($("#row-1-" + wDire.id).val());
        wDire.monto = parseFloat($("#row-2-" + wDire.id).val());
        wAct.directivas.push(wDire);
    }
    var ruta = Conn.URL + "nomina/directiva/actualizar";
    CargarAPI(ruta, "POST", wAct.directivas, wAct );
    
}
function calcularMonto(elem, id){
    
    var factor = parseFloat(elem.value);
    var monto = factor * parseFloat($("#salariom").val());

    $(`#row-2-${id}`).val(monto.toFixed(2));
    
}
function alertErr(titulo, msj, type){
    var tp = 'danger';
    if(tp != undefined){
        tp = type;
    }
    $.notify(
        {
            title: `<strong>${titulo}!</strong>`,
            message: msj
        },
        {
            type: tp
        } 
    );
}

function HTMLtabulador(){
    return `
        <table id="reportedirectiva" class="ui celled table table-bordered table-striped dataTable">
            <thead>
            <tr>
                <th style="width: 30px;">ID</th>
                <th  style="width: 100px;">GRADO</th>
                <th  style="width: 30px;">ANTIGUEDAD</th>
                <th  style="width: 80px;">FACTOR</th>
                <th  style="width: 80px;">SALARIO</th>                                  
            </tr>
            </thead>
            <tbody>
            </tbody>                  
        </table>`;

}
