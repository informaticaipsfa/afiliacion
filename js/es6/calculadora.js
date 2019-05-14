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
    //$("#txtFIngreso").attr('disabled', valor);
    //$("#txtFRetiro").attr('disabled', valor);
    //$("#txtServicio").attr('disabled', valor);
    //$("#txtFUAscenso").attr('disabled', valor);
    //$("#txtAntiguedad").attr('disabled', valor);
    $("#txtPension").attr('disabled', valor);
    //$("#txtNumHijos").attr('disabled', valor);
    $("#txtInicioCalc").attr('disabled', valor);
    $("#txtFinCalc").attr('disabled', valor);
   
}
let wCalculos = {};

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
        
        wCalculos = req;

        var tasignacion = 0;
        var tfcis = 0;
        var ttotal = 0;
        var tbonr = 0;
        var tvaca = 0;

        var tbonos = 0;
        var taguin = 0;
        var tneto = 0;
        //console.log(req.Retroactivo);
        $("#_tblCalculadoraHMTL").html(obtenerTablaCalculosHTML());
        var tblP = $('#tblCalculadora').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': false,
            'autoWidth': false,
            "language": {
                "decimal": ",",
                "thousands": "."
            }
        });
        tblP.clear().draw();
        $.each(req.Retroactivo, function (clave, valor) { 
            
            var asignacion = 0;
            var fcis = 0;
            var bonr = 0;
            var vaca = 0;
            var bonos = 0;
            var aguin = 0;
            var detalle = 0;
            
            $.each(valor, function (cl, vl) {
                
                switch (cl) {
                    case 'sueldo_mensual':
                        asignacion = vl.mt;        
                        break;
                    case 'FCIS-00001':
                        fcis =  vl.mt;
                        break;
                    case 'retribucion_especial':
                        bonr =  vl.mt;
                        break;
                    case 'vacaciones':
                        vaca =  vl.mt;
                        break;
                    case 'aguinaldos':
                        aguin =  vl.mt;
                        break;
                    case 'detalle':
                        detalle =  vl.ABV;
                        break;
                    default:
                        if ( cl.substring(0, 4) == 'bono' ){
                            bonos +=  vl.mt;
                        }
                        break;
                }
                
            });
           
                
           var total = asignacion-fcis;
           var neto = total + bonr + vaca + aguin;

           tasignacion += parseFloat(asignacion);
           tfcis += parseFloat(fcis);
           ttotal += parseFloat(total);
           tbonr += parseFloat(bonr) + bonos;
           tvaca += parseFloat(vaca);
           taguin += parseFloat(aguin);
           tneto += parseFloat(neto);

                        
            tblP.row.add([
                detalle.toUpperCase(),
                parseFloat(parseFloat(asignacion).toFixed(2)),
                parseFloat(parseFloat(fcis).toFixed(2)),
                parseFloat(parseFloat(total).toFixed(2)),
                parseFloat(parseFloat(bonr).toFixed(2)),
                parseFloat(parseFloat(vaca).toFixed(2)),
                parseFloat(parseFloat(aguin).toFixed(2)),
                parseFloat(parseFloat(neto).toFixed(2))
            ]).draw(false);
        });

        tblP.row.add([
            'TOTALES',
            parseFloat(parseFloat(tasignacion).toFixed(2)),
            parseFloat(parseFloat(tfcis).toFixed(2)),
            parseFloat(parseFloat(ttotal).toFixed(2)),
            parseFloat(parseFloat(tbonr).toFixed(2)),
            parseFloat(parseFloat(tvaca).toFixed(2)),
            parseFloat(parseFloat(taguin).toFixed(2)),
            parseFloat(parseFloat(tneto).toFixed(2))
        ]).draw(false);

    }
}

function obtenerTablaCalculosHTML(){
    return `
    <table class="ui celled table tablanetos" cellspacing="0" width="800px" id="tblCalculadora" >
        <thead>
            <tr >
                <th>DESCRIPCION DEL MES </th>
                <th>ASIGNACION</th>
                <th>FCIS. 6.5%</th>
                <th>PENSION</th>
                <th>TOTAL BONOS</th>
                <th>BONO RECRE.</th>
                <th>AGUINALDOS</th>
                <th>NETO</th>
            </tr>
        </thead >
        <tbody>
        </tbody>
    </table>`;

}
function ejecutarCalculadora(){
    var Calc = new WCalc();
    Calc.inicio = $("#txtInicioCalc").val();
    Calc.fin = $("#txtFinCalc").val();
    if(Calc.inicio == "" || Calc.fin == "" ){
        $.notify({
                title: '<strong>Proceso de Cálculos!</strong>',
                message: 'Las fechas deben estar completas'
            }, {
                type: 'danger'
            } 
        );
        return
    }
    $("#_dtcalculadora").show();

    Calc.fingreso = $("#txtFIngreso").val();
    Calc.fascenso = $("#txtFUAscenso").val();
    
    Calc.fretiro = $("#txtFRetiro").val();
    Calc.grado = $("#txtGradoT").val();
    Calc.codigo = $("#txtGrado").val();
    Calc.componente = $("#txtComponente").val();
    Calc.antiguedad = $("#txtAntiguedad").val();
    Calc.tiempo = $("#txtServicio").val();
    
    Calc.hijos = $("#txtNumHijos").val();
    Calc.porcentaje = $("#txtPension").val();
    //console.log(Calc);
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

    //console.log(arr);
    return arr;

}


function imprimirCalculos(){
    var e = sessionStorage.getItem("ipsfaToken");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;

    var tabla = $("#_tblCalculadoraHMTL").html();
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
    var fecha = $('#txtInicioCalc').val() + " - " + $('#txtFinCalc').val() ; 
    var porcentaje = $('#txtPension').val();
    var localtime = new Date().toLocaleString();
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
        <h3>MILITAR TITULAR<BR>
            CALCULOS CORRESPONDIENTE PARA EL PAGO
        </h3>
        <br>
        <table style="width:800px" class="tablaneto">
        <tr>
            <td align="center"><b>GRADO</b><BR>${grado}</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${nombre}</label></td>
            <td align="center"><b>N° DE CEDULA</b><BR><label>${cedula}</cedula></td>
        </tr>
        <tr>
            <td align="center"><b>FECHA INGRESO</b><BR>${fingreso}</td>
            <td align="center"><b>FECHA RETIRO</b><BR><label id="nombre">${fretiro}</label></td>
            <td align="center"><b>F. ULT. ASCENSO</b><BR><label>${fultimo}</cedula></td>
            <td align="center"><b>TIEMPO SERVICIO</b><BR><label>${servicio}</cedula></td>
        </tr>
        <tr>
            <td align="center"><b>ANTIGUEDAD</b><BR>${antiguedad}</td>
            <td align="center"><b>PORCENTAJE</b><BR><label>${porcentaje}</label></td>
            <td align="center"><b>NUMERO HIJOS</b><BR><label>${hijos}</cedula></td>
            <td align="center"><b>FECHA DESDE / HASTA</b><BR><label>${fecha}</cedula></td>
        </tr>
        </table>
        <br>
        ${tabla}
    </div><br><br><br>
    <h3><BR>
    APROBADO POR<BR></h3>
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
            font-size: 12px;
        }
        table{
            border-collapse: collapse;
            font-family: Arial, Calibre;
            font-size: 12px;
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
            font-size: 13px;
        } 
        .tablanetos tr{
            text-align: right;
            border: 1px solid #CCCCCC;
        } 
        .tablanetos td {
            text-align: right;
            border: 1px solid #CCCCCC;
            font-size: 13px;
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