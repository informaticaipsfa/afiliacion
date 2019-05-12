var ObjCalcular = {};

class Calculadora{
    constructor(){}
    Crear(req){
        
        var nombre = req.Persona.DatoBasico.nombreprimero + " " + req.Persona.DatoBasico.apellidoprimero;
        var fingreso = req.fingreso.substring(0, 10);
        $("#txtNombre").val(nombre.toUpperCase().trim());

        $('#txtFIngreso').val(fingreso.substring(0, 10));
        var fretiro = req.fretiro.substring(0, 10);
        if ( fretiro == "0001-01-01" ){
            fretiro = req.fresuelto.substring(0, 10);    
        }
        $('#txtFRetiro').val(fretiro.substring(0, 10));        
        $('#txtFUAscenso').val(req.fascenso.substring(0, 10));
        $('#txtServicio').val(req.tiemposervicio);


        var ti = parseInt(req.tiemposervicio.split("A")[0]);
        var ingreso = parseInt(fingreso.split("-")[0]);
        $("#txtPension").val(Util.AsignarPorcentajePension(ingreso, ti));
        var i = 0;
        req.Familiar.forEach(v => {
            if ( v.beneficio == true && v.parentesco == "HJ") {
                i++;                
            }
        });
        $('#txtNumHijos').val(i);
        

        
    }
}


function BuscarCalculos(){
    var Calc = new Calculadora();

    ActivarFechaCalculadora();
    FrmCalculadora(false);

    var url = Conn.URL + "militar/crud/" + $("#txtcedula").val();
    CargarAPI(url, "GET", "", Calc);
}

function ActivarFechaCalculadora(){
    console.log('Entrando');
    $('#txtFIngreso').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#txtFRetiro').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#txtFUAscenso').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#txtInicioCalc').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#txtFinCalc').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $("#_dtcalculadora").hide();
}

function FrmCalculadora(valor) {
    $("#txtFIngreso").attr('disabled', valor);
    $("#txtFRetiro").attr('disabled', valor);
    //$("#txtServicio").attr('disabled', valor);
    $("#txtFUAscenso").attr('disabled', valor);
    $("#txtAntiguedad").attr('disabled', valor);
    $("#txtPension").attr('disabled', valor);
    //$("#txtNumHijos").attr('disabled', valor);
    $("#txtInicioCalc").attr('disabled', valor);
    $("#txtFinCalc").attr('disabled', valor);
   
}

function ejecutarCalculadora(){
    $("#_dtcalculadora").show();
}



