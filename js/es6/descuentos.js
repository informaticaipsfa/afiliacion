
function MostrarDescuentos(Descuentos, DPen){
    $.each(Descuentos, function (c, v) {
        var concepto = v.concepto!=undefined?v.concepto:''; 
        var observacion = v.observacion!=undefined?v.observacion:'';
        var formula = v.formula!=undefined?v.formula:'';
        var fechainicio = v.fechainicio!=undefined?v.fechainicio:'';
        var fechafin = v.fechafin!=undefined?v.fechafin:'';
        DPen.row.add([
            concepto,
            observacion,
            formula, 
            Util.ConvertirFechaHumana(fechainicio),
            Util.ConvertirFechaHumana(fechafin)
        ]).draw(false);
    });
}

class WDescuentos{
    constructor(){
        this.id = '';
        this.tipo = '';
        this.concepto = '';
        this.formula = '';
        this.observacion = '';
        this.fechainicio = '';
        this.fechafin = '';
        this.estatus = 0;
    }
    Crear(req){
        waitingDialog.hide();
        $.notify(
            {
                title: '<strong>Pago a terceros!</strong>',
                message: 'finalizo con <strong>éxito</strong>'
            },
            {
                type: 'success'
            } 
        );
        
    }
}
function IncluirDescuentos(){
    
    $('#datepickerD').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#datepickerfinD').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    

    $('#mdlDescuentos').modal('show');
}


function GuardarDescuentos(){
    var DC = new WDescuentos();
    var fn = $("#txtformulaD").val();
    if(fn == ""){
        
        return false;
    }else if(fn.substr(-1) != ";"){
        fn += ";";
    }
    var fecha = new Date(Util.ConvertirFechaUnix($("#datepickerD").val())).toISOString();
    var fechafin = new Date(Util.ConvertirFechaUnix($("#datepickerfinD").val())).toISOString();
    DC.id = $("#txtcedula").val();
    DC.tipo = $("#cmbtipoD").val();
    DC.concepto = $("#cmbConceptoD").val();
    DC.formula = fn;
    DC.observacion = $("#txtobservacionD").val();
    DC.fechainicio = fecha;
    DC.fechafin = fechafin;
    DC.estatus = parseInt($("#cmbEstatusD").val());
    console.log(DC);
    var url = Conn.URL + "descuentos";
    $('#mdlDescuentos').modal('hide');
    waitingDialog.show('Guardando pago a terceros, por favor espere...');
    CargarAPI(url, "POST", DC, DC);
}