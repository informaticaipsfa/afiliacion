var ObjCalcular = {};

class Calculadora{
    

    Crear(req){
        
        var nombre = req.Persona.DatoBasico.nombreprimero + " " + req.Persona.DatoBasico.apellidoprimero;
        var fingreso = req.fingreso.substring(0, 10);
        var fascenso = req.fascenso.substring(0, 10);

        $("#txtGradoT").val(req.Grado.abreviatura.toUpperCase().trim());
        $("#txtGrado").val(req.Grado.abreviatura);
        $("#txtComponente").val(req.Componente.abreviatura);
        $("#txtNombre").val(nombre.toUpperCase().trim());        
        $('#txtFIngreso').val(fingreso.substring(0, 10));
        var fretiro = req.fretiro.substring(0, 10);
        if ( fretiro == "0001-01-01" ){
            fretiro = new Date().toISOString().slice(0, 10);    
        }


        $('#txtFRetiro').val(fretiro.substring(0, 10));        
        $('#txtFUAscenso').val(fascenso);
        $('#txtServicioT').val(req.tiemposervicio);
        
        var antiguedad = antiguedadGrado(fascenso, fretiro);
        $('#txtAntiguedad').val(antiguedad['n']);
        
        var ti = parseInt(req.tiemposervicio.split("A")[0]);
        var ingreso = parseInt(fingreso.split("-")[0]);
        $("#txtPension").val(Util.AsignarPorcentajePension(ingreso, ti));
        $('#txtServicio').val(ti);

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
    //$("#txtAntiguedad").attr('disabled', valor);
    $("#txtPension").attr('disabled', valor);
    //$("#txtNumHijos").attr('disabled', valor);
    $("#txtInicioCalc").attr('disabled', valor);
    $("#txtFinCalc").attr('disabled', valor);
   
}
class WCalc{
    constructor(){
        this.fingreso = '';
        this.fascenso = '';
        this.fretiro = '';
        this.grado = '';
        this.codigo = '';
        this.componente = '';
        this.antiguedad = 0;
        this.tiempo = 0;
        this.inicio = '';
        this.fin = '';
        this.hijos = 0;
        this.porcentaje = 0.00;
    }
    Crear(req){
        console.log(req.Retroactivo);
        var tblP = $('#tblCalculadora').DataTable(opcionesf);
        tblP.clear().draw();
        $.each(req.Retroactivo, function (clave, valor) { 
            $.each(valor, function (cl, vl) {
                console.log(vl.mt);
            });
           
                
           
            //var fcis = v.             
            // tblP.row.add([
            //     v.partida,
            //     v.codigo,
            //     v.descripcion
            // ]).draw(false);
        });
    }
}
function ejecutarCalculadora(){
    var Calc = new WCalc();

    $("#_dtcalculadora").show();

    Calc.fingreso = $("#txtFIngreso").val();
    Calc.fascenso = $("#txtFUAscenso").val();
    
    Calc.fretiro = $("#txtFRetiro").val();
    Calc.grado = $("#txtGradoT").val();
    Calc.codigo = $("#txtGrado").val();
    Calc.componente = $("#txtComponente").val();
    Calc.antiguedad = $("#txtAntiguedad").val();
    Calc.tiempo = $("#txtServicio").val();
    Calc.inicio = $("#txtInicioCalc").val();
    Calc.fin = $("#txtFinCalc").val();
    Calc.hijos = $("#txtNumHijos").val();
    Calc.porcentaje = $("#txtPension").val();
    console.log(Calc);
    var ruta = Conn.URL + "pensionado/calcularretroactivo";
    CargarAPI(ruta, "POST", Calc, Calc);
}





  /**
  * Permite restar fechas exactas
  *
  * @access public
  * @param Date
  * @return int
  */
function antiguedadGrado(fecha, fecha_retiro){    
    var arr = [];
    
    var fecha_r = fecha_retiro.split("-");
    var ano_r = fecha_r[0];
    var mes_r = fecha_r[1];
    var dia_r = fecha_r[2];

    var list = fecha.split("-");
    var ano = list[0];
    var mes = list[1];
    var dia = list[2];

    if (dia_r < dia){
      dia_dif =  (dia_r+30) - dia; //27 -5
      mes_r--;
    }else{
      dia_dif =  dia_r - dia; //27 -5
    }

    if (mes_r < mes){
       mes_dif =  (mes_r + 12) - mes; //27 -5
       ano_r--;
    }else{
      mes_dif =  mes_r - mes;
    }

    ano_dif = ano_r - ano;
    arr['e'] = ano_dif;

    if(mes_dif > 5) {
      arr['n'] = ano_dif + 1;
    }else{
      arr['n'] = ano_dif;
    }

    console.log(arr);
    return arr;

}
